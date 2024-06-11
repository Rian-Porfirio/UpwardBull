function InputForm({name, instruction, type}) {
  return (
    <div className="text-black h-1/2">
      <label className="text-sm font-semibold">
        {name}
        <input className="text-sm font-normal input input-bordered rounded-sm py-[8px] px-[12px] w-full bg-blue-100 h-fit" type={type} placeholder={instruction} />
      </label>
    </div>
  );
}

InputForm.defaultProps = {
    type: "text",
    instruction: "type here",
    name: "input"
}

export default InputForm