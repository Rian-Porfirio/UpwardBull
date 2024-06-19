function InputForm({name = "input", instruction = "type here", type = "text", onChange, value}) {
  return (
    <div className="text-black h-1/2 mb-3">
      <label className="text-[12px] font-semibold">
        {name}
        <input className="text-sm font-normal focus:outline-none input input-bordered rounded-sm py-[8px] px-[12px] w-full bg-blue-100 h-fit" type={type} placeholder={instruction} onChange={onChange} value={value}/>
      </label>
    </div>
  );
}

export default InputForm