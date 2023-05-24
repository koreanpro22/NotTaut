import React, { useState, useContext } from "react"

const ChannelIdContext = React.createContext()
const ChannelIdUpdateContext = React.createContext()

export function useChannelId() {
    return useContext(ChannelIdContext)
}

export function useChannelIdUpdate() {
    return useContext(ChannelIdUpdateContext)
}

export function ChannelIdProvider({children}) {
    const [channelId, setChannelId] = useState()

    function setNewChannelId(id) {
        return setChannelId(id)
    }

    return (
        <ChannelIdContext.Provider value={channelId}>
            <ChannelIdUpdateContext.Provider value={setNewChannelId}>
                {children}
            </ChannelIdUpdateContext.Provider>
        </ChannelIdContext.Provider>
    )
}
