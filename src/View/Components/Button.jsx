export default function Button({action, disabled = false, onClick, hover}) {
  return (
    <button className={`${disabled ? `loginButtonDisabled bg-[#084f6b] cursor-not-allowed` : `loginButton hover:bg-[${hover}]`} text-black text-[12px] font-semibold py-[8px]`} disabled={disabled} onClick={onClick}>{action}</button>
  )
}
