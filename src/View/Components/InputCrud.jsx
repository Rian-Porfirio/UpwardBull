export default function InputCrud({name, value, change}){
    return (
        <div>
            <h2 className="mb-1">{name}</h2> 
            <input className="input input-bordered h-6 bg-neutral-200 w-full text-xs" value={value} onChange={change}/>
         </div>
    )
}