import Image from 'next/image'
import Link from 'next/link';
import {
  BoltIcon
} from '@heroicons/react/24/outline';
import LoginForm from './login/login-form';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-green-500 p-4 md:h-52">
        {/* Logo*/}
        <BoltIcon className="h-10 w-10 text-white-100"/>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to the power charging application.</strong> 
            <span> Please login or sign up! </span> 
          </p>
          <div className='flex items-center'>
              <Link href="/login" className="no-underline w-50 gap-5 self-start rounded-lg bg-lime-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-yellow-400 md:text-base">
            <span>Log in</span>
            
          </Link>
          <Link href="/signup" className="no-underline w-50 gap-5 ml-5 self-start rounded-lg bg-lime-800 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-yellow-400 md:text-base">
            <span>Sign up</span>
          </Link>
          </div>
        
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image
        src="/map.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the charging stations showing desktop version"
      />
       <Image
        src="/map.png"
        width={560}
        height={620}
        className="block md:hidden"
        alt="Screenshots of the charging stations showing mobile version"
      />
        </div>
      </div>
    </main>
  );
}
