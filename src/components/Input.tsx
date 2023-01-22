import { FC } from 'react'

type InputProps = {
    placeholder?: string
    className?: string
    value: string
    onChange: (value: string) => void
}

const Input: FC<InputProps> = ({ placeholder, className, value, onChange }) => {
    return (
        <div className={className}>
            <input
                className="w-[300px] rounded-md p-2 focus:bg-blue-200 focus:outline-none"
                type="text"
                placeholder={placeholder}
                onChange={ev => onChange(ev.target.value)}
                value={value}
            />
        </div>
    )
}

export default Input
