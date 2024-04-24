import React, { useRef } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormValue {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
  nickname: string;
}



const Signup: React.FC = () => {

  const navigate = useNavigate();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValue>();

  const passwordRef = useRef<string | null>(null)
  passwordRef.current = watch("password")


  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    try {
      // 여기에 API 엔드포인트를 사용하세요
      const response = await axios.post('https://ke6f20a9f2b88a.user-app.krampoline.com/user/register', data,{
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        }});
      console.log(response.data);

      if(response.data.success) navigate('/login');
    } 
    catch (error) {
      // 오류 처리 로직
      if (axios.isAxiosError(error) && error.response) {
        console.log('API Error:', error.response.data);
      } else {
        console.log('Unexpected Error:', error);
      }
    }
  };

  return (
    <div className="relative h-[100vh] items-center justify-center bg-white dark:bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="jumbo absolute -inset-[10px] opacity-50" />
      </div>
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
        <div className="relative w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#">
            <h5 className="flex justify-center text-xl font-medium text-gray-900 dark:text-white">회원가입</h5>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                id="floating-username"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                {...register("username", { required: true, maxLength: 10 })} />
              <label htmlFor="floating-username" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">아이디</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                id="floating-password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                {...register("password", { required: true, minLength: 6 })} />
              <label htmlFor="floating-password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">비밀번호</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                id="password-confirm"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                {...register("passwordConfirm", {
                  required: true,
                  validate: (value) => value === passwordRef.current,
                })}
              />
              <label htmlFor="password-confirm" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">비밀번호 확인</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
            <input
                type="email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              />
              <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">이메일</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
            <input
                type="text"
                id="floating-nickname"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                {...register("nickname", { required: true, maxLength: 10 })}
              />
              <label htmlFor="floating-nickname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">닉네임</label>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">회원가입</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}

export default Signup;