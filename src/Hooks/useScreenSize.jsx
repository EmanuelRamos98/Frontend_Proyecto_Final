import React, { useEffect, useState } from 'react'

const useScreenSize = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 770)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 770)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])


    return {
        isMobile
    }
}

export default useScreenSize