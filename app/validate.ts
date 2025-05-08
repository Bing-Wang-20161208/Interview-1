// 国内手机号校验
export const validatePhone = (phone: string) => {
    const reg = /^1[3456789]\d{9}$/
    return reg.test(phone)
}
// 六位数字验证码校验
export const validateCode = (code: string) => {
    const reg = /^\d{6}$/
    return reg.test(code)
}