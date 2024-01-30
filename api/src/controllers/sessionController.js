const ChargerModel = require('../models/Charger');
const logger = require('../logger/logger');
const schedule = require('node-schedule');
const SessionModel = require('../models/Session');
const UserModel = require('../models/User');

const reserveCharger = async (req, res) => {

  try {
    const { id, startTime, endTime, user } = req.body;
    const timeslot = await checkAvailability(id, startTime, endTime);

    if (timeslot && !timeslot.available) {

      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
      };

      res.json({
        success: false,
        message: `Charger is already reserved for that timeslot. Please choose another timeslot. Conflicting reservation is between:
         ${new Intl.DateTimeFormat('sr-SR', options).format(timeslot?.conflictingReservations[0]?.startTime,)} -  ${ new Intl.DateTimeFormat('sr-SR', options).format(timeslot?.conflictingReservations[0]?.endTime)}`
      });
    } else {

      // Create a new session
      const newSession = new SessionModel({
        id,
        user,
        startTime,
        endTime,
      });

      // Save the session to the database
      await newSession.save();

      // Simulate charging, schedule the start and the end time
      await startCharging(startTime, endTime, id, user)
      await stopCharging(endTime, id)

      res.json({
        success: true,
        message: "Reservation is successfull"
      });
    }


  } catch (error) {
    logger.error('Internal Server Error during charging simulation' + error)
    res.status(500).json({ error: 'Internal Server Error during charging simulation' });
  }
}

async function startCharging(startTime, endTime, id, user) {
  try {

    schedule.scheduleJob(new Date(startTime), async () => {

      // Update the charging status in the database
      const updatedCharger = await ChargerModel.findByIdAndUpdate(
        id,
        { status: 'occupied', user: user },
        { new: true }
      );

      logger.info(`[${startTime}] Charging status updated: ${updatedCharger}`);
    });
  } catch (error) {
    throw error;
  }
}

async function stopCharging(endTime, id, user = null) {
  console.log("stop charging is set")
  try {
    schedule.scheduleJob(new Date(endTime), async () => {

      const updatedCharger = await ChargerModel.findByIdAndUpdate(
        id,
        { status: 'available', user: '' },
        { new: true }
      );

      const deletedCharger = await SessionModel.findOneAndDelete({ id });

      // If needed, update the user battery 
      if (user) await UserModel.findByIdAndUpdate(user._id, { batteryPercentage: 100 });

      // After N ms, update the database
      logger.info(`Charging completed at: ${endTime}`);
    });
  }
  catch (error) {
    throw error;
  }
}

async function checkAvailability(id, startTime, endTime) {

  try {

    // Check for existing reservations for the specified charger and time range
    const existingReservations = await SessionModel.find({
      id,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, // Reservation overlaps
        { startTime: { $gte: startTime, $lt: endTime } }, // Reservation starts within the range
        { endTime: { $gt: startTime, $lte: endTime } }, // Reservation ends within the range
      ],
    });

    if (existingReservations?.length === 0) {
      return {
        available: true
      }
    }

    return {
      available: false,
      conflictingReservations: existingReservations
    }

  } catch (error) {
    console.error('Error checking charger availability:', error);
    return { error: 'Internal Server Error' };
  }
}

const connectCharger = async (req, res) => {
  const { id, email, status } = req.body;

  try {

    const updatedCharger = await ChargerModel.findByIdAndUpdate(id, { status: status, user: email }, { new: true });

    if (!updatedCharger) {
      return res.status(404).json({ error: 'Charger not found' });
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(updatedCharger, user)

    const startTime = new Date();
    const chargingTime = calculateChargingTime(user.batteryCapacity, user.batteryPercentage, updatedCharger.power);
    const endTime = new Date(new Date().getTime() + chargingTime * 60 * 60 * 1000); //adding ms to the current time

    // Create a new session
    const newSession = new SessionModel({
      id,
      user: email,
      startTime,
      endTime,
    });

    // Save the session to the database
    await newSession.save();

    // Schedule to disconnect the carger after the battery is fully chargered
    stopCharging(endTime, id, user);

    res.json(newSession);
  } catch (error) {
    logger.error('Error updating charger by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function calculateChargingTime(batteryCapacity, initialBatteryPercentage, chargingPower) {
  //Simplified calculation and actual charging time may vary due to factors like charging efficiency, temperature, and charging curve characteristics. 
  
  if (chargingPower <= 0 || batteryCapacity<=0 || initialBatteryPercentage<=0) {
    throw new Error('Charging information must be greater than 0.');
  }

  initialBatteryPercentage *= (1 / 100); // ex. 20% = 0.2
  chargingPower *= 1000; // Charging power is in kW

  // return the time in hours
  return (batteryCapacity * (1 - initialBatteryPercentage) / (chargingPower));
}

module.exports = {
  reserveCharger,
  connectCharger
};