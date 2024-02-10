import React, { useEffect, useState } from 'react'
import { Switch } from '../ui/switch'

interface SwitchInactiveProps {
    id: string
    checked: boolean
    handleChange: (checked: boolean, id: string) => void
}

const SwitchInactive: React.FC<SwitchInactiveProps> = ({ id, checked, handleChange }) => {
    const [isChecked, setIsChecked] = useState<boolean>(checked)

    const handleCheckedChange = (checked: boolean) => {
        setIsChecked(ischecked => !ischecked)
        handleChange(checked, id)
    }

    useEffect(() => {
        setIsChecked(checked)
    }, [checked])

    return (
        <>
            <Switch
                checked={isChecked}
                onCheckedChange={handleCheckedChange}
            />
        </>
    )
}

export default SwitchInactive
