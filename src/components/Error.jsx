const Error = ({children}) => {
  return (
   
    <div className="bg-red-800 text-white text-center
        md:p-3 uppercase font-bold md:mb-3 rounded-md">
            <p>{children}</p>
    </div>
   
  )
}

export default Error