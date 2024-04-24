import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // 폼 기본 제출 동작 방지
    try {
      const response = await axios.post('https://kcd7f2e0bc7b8a.user-app.krampoline.com/user/login', {
        username: formData.id,
        password: formData.password
      });

      if (response.data.success) {
        localStorage.setItem('token', response.headers['Authorization']); // 토큰 저장
        navigate('/main'); // 성공시 메인 페이지로 이동
      } else {
        setErrorMessage(response.data.message || '로그인 처리 중 문제가 발생했습니다.');
      }
    } catch (error) {
      if (error.response) {
        // 서버에서 응답을 받았으나 에러가 발생한 경우
        const errors = error.response.data.errors || ['서버 에러 발생'];
        setErrorMessage(error.response.data.message + ' ' + errors.join(', '));
      } else {
        // 요청이 이루어지지 않은 경우
        setErrorMessage('네트워크 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="relative h-[100vh] items-center justify-center bg-white dark:bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="jumbo absolute -inset-[10px] opacity-50" />
      </div>
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
        <div className="relative w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-600">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-bold flex justify-center text-xl font-medium text-gray-900 dark:text-white">Sign in</h5>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Id"
                required
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Password"
                required
              />
            </div>
            {errorMessage && (
              <div className="text-red-500 text-sm mb-2">{errorMessage}</div>
            )}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
                <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember Me</label>
              </div>
              <Link to="/forgotpassword" className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Forgot Password?</Link>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Log in
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Need an account?<Link to="/signup" className="text-blue-700 hover:underline dark:text-blue-500"> Create an account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
