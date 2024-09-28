export default function InputCrud({name, value, change, type = "text", styles}){
    return (
        <div>
            <h2 className="mb-1">{name}</h2> 
            <input className={`${styles} input input-bordered h-8 bg-neutral-200 w-full text-xs`} value={value} type={type} onChange={change}/>
         </div>
    )
}