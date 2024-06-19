function Button({action, disabled = false, onClick}) {
  return (
    <button className={`${disabled ? "loginButtonDisabled cursor-not-allowed" : "loginButton hover:bg-[#2d7cb1]"} text-black text-[12px] font-semibold py-[8px]`} disabled={disabled} onClick={onClick}>{action}</button>
  )
}

export default Button