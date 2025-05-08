'use client'
import './home.css'
import { type ChangeEventHandler, type FormEventHandler, type MouseEventHandler, useMemo, useState } from 'react';
import { validatePhone, validateCode } from './validate';

interface FormData {
  mobile: string;
  code: string;
}

interface Errors extends FormData { }

export default function Home() {
  // 表单状态
  const [formData, setFormData] = useState<FormData>({
    mobile: '',
    code: ''
  });

  // 错误信息状态
  const [errors, setErrors] = useState<Errors>({
    mobile: '',
    code: ''
  });

  // 提交状态
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 表单验证函数
  const checkMobile = (mobile: string) => {
    if (!mobile) {
      return '请输入手机号';
    }
    if (!validatePhone(mobile)) {
      return '手机号格式错误';
    }
    return '';
  };

  const checkCode = (code: string) => {
    if (!code) {
      return '请输入验证码';
    }
    if (!validateCode(code)) {
      return '验证码格式错误';
    }
    return '';
  };

  // 处理输入变化
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // 实时验证
    if (name === 'mobile') {
      setErrors({
        ...errors,
        mobile: checkMobile(value)
      });
    } else if (name === 'code') {
      setErrors({
        ...errors,
        code: checkCode(value)
      });
    }
  };

  // 获取验证码
  const handleGetCode: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    // 这里可以添加获取验证码的逻辑
    console.log('获取验证码');
  };

  // 表单提交
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // 提交前验证
    const mobileError = checkMobile(formData.mobile);
    const codeError = checkCode(formData.code);

    setErrors({
      mobile: mobileError,
      code: codeError
    });

    // 如果有错误，不提交
    if (mobileError || codeError) {
      return;
    }

    // 设置提交状态
    setIsSubmitting(true);

    // 模拟接口请求，1秒后成功
    setTimeout(() => {
      console.log(formData);
      setIsSubmitting(false);
    }, 1000);
  };

  // 判断获取验证码按钮是否禁用
  const isGetCodeDisabled = useMemo(() => !!checkMobile(formData.mobile), [formData.mobile]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-item">
        <input
          placeholder="手机号"
          name="mobile"
          value={formData.mobile}
          onChange={handleInputChange}
        />
        {errors.mobile && <p className="form-error">{errors.mobile}</p>}
      </div>

      <div className="form-item">
        <div className="input-group">
          <input
            placeholder="验证码"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
          />
          <button
            className={`getcode ${isGetCodeDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={isGetCodeDisabled}
            onClick={handleGetCode}
          >
            获取验证码
          </button>
        </div>
        {errors.code && <p className="form-error">{errors.code}</p>}
      </div>

      <button
        className={`submit-btn ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'submiting......' : '登录'}
      </button>
    </form>
  );
}
