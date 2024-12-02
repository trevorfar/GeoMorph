interface ButtonProps {
    text: string,
    onClick: () => void,
    className?: string,
    disabled?: boolean
}

const StyledButton = ({text, onClick, className, disabled}: ButtonProps) => {
    return (
        <button 
        onClick={()=> onClick}
        className={`bg-purple-700 text-white py-2 px-4 rounded-xl
         hover:bg-purple-700/80 hover:text-opacity-55 ${className}`}>
        {text}
        </button>
    )
}
export default StyledButton