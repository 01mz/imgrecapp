import React, {ReactNode} from 'react';

export type User = {
    id: Number,
    username: String,
}

export type AuthContextType = {
    user: User | null,
    setUser: Function,
    getAxiosAuthConfig: Function
}

export const AuthContext = React.createContext<AuthContextType>({
    user: null,
    setUser: null as unknown as Function,
    getAxiosAuthConfig: () => {return {withCredentials:true}}
})

export const AuthProvider = ({children}: {children:ReactNode}) => {
    const [user, setUser] = React.useState(null)
    const getAxiosAuthConfig = () => {
        return {
            withCredentials: true,
            headers: {'Content-Type': 'application/json'}
        }
    }

    return (
        <AuthContext.Provider value={{user, setUser, getAxiosAuthConfig}}>
            {children}
        </AuthContext.Provider>
    )
}