export default function Button({action, disabled = false, onClick, color, hover}) {
  return (
    <button className={`${disabled ? `loginButtonDisabled bg-[${color}] cursor-not-allowed` : `loginButton hover:bg-[${hover}]`} text-black text-[12px] font-semibold py-[8px] bg-[$[co]]`} disabled={disabled} onClick={onClick}>{action}</button>
  )
}
