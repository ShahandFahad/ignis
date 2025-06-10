'use client'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context"
import { useState } from "react";

const AUTH_OPTION = {
    LOGIN: 'option-login',
    REGISTER: 'option-register',
};

export default function AuthPage() {
    const { register, login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authOption, setAuthOption] = useState(AUTH_OPTION.LOGIN);

    const handleLogin = async () => {
        if (!email || !password) return;
        await login(email, password);
    }

    const handleRegister = async () => {
        if (!email || !password) return;
        await register(email, password);
    }

    return (
        <div className="border rounded bg-gray-50 mt-50 mb-50 max-w-md mx-auto p-8 space-y-4">
            <h2 className="text-center text-orange-500 text-4xl font-bold">
                {authOption === AUTH_OPTION.LOGIN ? "Login" : "Register"}
            </h2>
            <p className="text-center text-orange-700">Chatbot and AI Assistant</p>

            <RadioGroup defaultValue={authOption} className="flex justify-center cursor-pointer">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem onClick={(e) => setAuthOption(e.target.value)} value={AUTH_OPTION.REGISTER} id="option-register" />
                    <Label htmlFor="option-one">Register</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem onClick={(e) => setAuthOption(e.target.value)} value={AUTH_OPTION.LOGIN} id="option-login" />
                    <Label htmlFor="option-two">Login</Label>
                </div>
            </RadioGroup>

            <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {
                // Login 
                authOption === AUTH_OPTION.LOGIN && (
                    <Button className="cursor-pointer" onClick={handleLogin} >
                        Login
                    </Button>
                )

            }
            {
                // Register
                authOption === AUTH_OPTION.REGISTER && (
                    <Button className="cursor-pointer" onClick={handleRegister} >
                        Register
                    </Button>
                )
            }

        </div>
    );
}
