import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './Componets'

import {
    ChatScreen,
    ContactProfileScreen,
    ForgotPasswordScreen,
    HomeScreen,
    LogginScreen,
    MyProfileScreen,
    RecoveryPasswordScreen,
    RegisterScreen,
    ValidationScreen
}
    from './Screens'


const App = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<LogginScreen />} />
                <Route path='/login' element={<LogginScreen />} />
                <Route path='/register' element={<RegisterScreen />} />
                <Route path='/forgot-password' element={<ForgotPasswordScreen />} />
                <Route path='/auth/recovery-password/:reset_token' element={<RecoveryPasswordScreen />} />
                <Route path='/validation-email/:user_email' element={<ValidationScreen />} />
                <Route element={<ProtectedRoute />}>
                    <Route path='/home' element={<HomeScreen />} />
                    <Route path='/chat/:receiverId' element={<ChatScreen />} />
                    <Route path='/my-profile' element={<MyProfileScreen />} />
                    <Route path='/contact-profile/:receiverId' element={<ContactProfileScreen />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App