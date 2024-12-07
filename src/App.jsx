import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ForgotPasswordScreen, HomeScreen, LogginScreen, RecoveryPasswordScreen, RegisterScreen } from './Screens'
import { ProtectedRoute } from './Componets'


const App = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<LogginScreen />} />
                <Route path='/login' element={<LogginScreen />} />
                <Route path='/register' element={<RegisterScreen />} />
                <Route path='/forgot-password' element={<ForgotPasswordScreen />} />
                <Route path='/auth/recovery-password/:reset_token' element={<RecoveryPasswordScreen />} />
                <Route element={<ProtectedRoute />}>
                    <Route path='/home' element={<HomeScreen />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App