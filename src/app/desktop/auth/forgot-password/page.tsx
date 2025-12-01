'use client'

import { CgSpinner } from "react-icons/cg";
import { LuMail, LuKeyRound, LuEye, LuEyeOff, LuHash } from "react-icons/lu";
import { IoMdArrowForward } from "react-icons/io";
import { useState, useRef } from "react";
import { useRouter } from 'next/navigation';
import { useSendCode, useValidateCode, useResetPassword } from "@/hooks/useAuth";
import Link from "next/link";

export default function ForgotPassword() {
    const router = useRouter()

    const [step, setStep] = useState<number>(1)
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""))
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const [passwords, setPasswords] = useState({
        password: "",
        password_confirmation: ""
    })

    const [viewPassword, setViewPassword] = useState<boolean>(false)
    const [error, setError] = useState<null | string>(null)
    const [successMessage, setSuccessMessage] = useState<null | string>(null)
    const [loading, setLoading] = useState(false)

    const handleSendCode = async () => {
        if (!email) {
            setError('Debes ingresar un email.')
            return
        }
        setError(null)
        setLoading(true)

        const response = await useSendCode({ email })

        if (!response.success) {
            setError(response.message || "Error desconocido")
        } else {
            setStep(2)
            setSuccessMessage("Código enviado a tu email.")
        }
        setLoading(false)
    }

    const handleValidateCode = async (codeOverride?: string) => {
        const codeToValidate = typeof codeOverride === 'string' ? codeOverride : otp.join('')

        if (codeToValidate.length < 6) {
            setError('Debes ingresar el código completo.')
            return
        }
        setError(null)
        setLoading(true)

        const response = await useValidateCode({ email, code: codeToValidate })

        if (!response.success) {
            setError(response.message || "Error desconocido")
        } else {
            setStep(3)
            setSuccessMessage("Código validado correctamente.")
        }
        setLoading(false)
    }

    const handleOtpChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return

        const newOtp = [...otp]
        newOtp[index] = value.substring(value.length - 1)
        setOtp(newOtp)

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }

        if (newOtp.every(digit => digit !== "") && step === 2) {
            handleValidateCode(newOtp.join(''))
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').slice(0, 6).split('')
        if (pastedData.length > 0) {
            const newOtp = [...otp]
            pastedData.forEach((value, index) => {
                if (index < 6) newOtp[index] = value
            })
            setOtp(newOtp)
            if (newOtp.every(digit => digit !== "") && step === 2) {
                handleValidateCode(newOtp.join(''))
            }
        }
    }

    const handleResetPassword = async () => {
        if (!passwords.password || !passwords.password_confirmation) {
            setError('Debes completar ambos campos.')
            return
        }
        if (passwords.password !== passwords.password_confirmation) {
            setError('Las contraseñas no coinciden.')
            return
        }
        setError(null)
        setLoading(true)

        const response = await useResetPassword({
            email,
            code: otp.join(''),
            password: passwords.password,
            password_confirmation: passwords.password_confirmation
        })

        if (!response.success) {
            setError(response.message || "Error desconocido")
        } else {
            setSuccessMessage("Contraseña restablecida con éxito.")
            setTimeout(() => {
                router.push('/desktop/auth/login')
            }, 2000)
        }
        setLoading(false)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (step === 1) handleSendCode()
        else if (step === 2) handleValidateCode()
        else if (step === 3) handleResetPassword()
    }

    return (
        <section className="flex flex-row-reverse w-full h-screen bg-white">
            <div className="flex flex-col w-1/3 items-center justify-center gap-y-6 mt-4">
                <div className="flex flex-col items-center">
                    <img src="/shared/mango-icon.png" width={80} height={80} className="mb-4" />

                    <span className="tracking-tight text-gray-500 font-semibold font-manrope text-sm">Recuperar cuenta en</span>
                    <span className="text-2xl font-bold tracking-tight font-grotesk text-[#141414]">Mango</span>

                    <p className="text-neutral-700 font-manrope font-semibold text-center px-8 mt-3">
                        {step === 1 && "Ingresa tu email para recibir un código de recuperación."}
                        {step === 2 && "Ingresa el código que enviamos a tu email."}
                        {step === 3 && "Ingresa tu nueva contraseña."}
                    </p>
                </div>

                <form
                    className="flex flex-col gap-y-3"
                    onSubmit={handleSubmit}
                >
                    {step === 1 && (
                        <div className="flex flex-row items-center bg-gray-100 rounded-xl pl-2 shadow-inner border-2 border-gray-200">
                            <LuMail className="text-xl mr-2 text-gray-500" />
                            <input
                                placeholder="Tu email" value={email}
                                className="bg-transparent h-10 w-64 px-2 rounded-r-xl outline-none font-manrope"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    )}

                    {step === 2 && (
                        <div className="flex flex-row justify-center gap-x-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { inputRefs.current[index] = el }}
                                    type="text"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className="w-12 h-12 text-center text-xl font-bold bg-gray-100 rounded-xl shadow-inner border-2 border-gray-200 outline-none focus:border-apricot-l1 font-manrope"
                                    maxLength={1}
                                />
                            ))}
                        </div>
                    )}

                    {step === 3 && (
                        <>
                            <div className="flex flex-row items-center bg-gray-100 rounded-xl px-2 shadow-inner border-2 border-gray-200">
                                <LuKeyRound className="text-xl mr-2 text-gray-500" />
                                <input
                                    placeholder="Nueva contraseña"
                                    value={passwords.password}
                                    className="bg-transparent h-10 w-64 px-2 rounded-r-xl outline-none"
                                    type={viewPassword ? "text" : 'password'}
                                    onChange={(e) => setPasswords({ ...passwords, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setViewPassword(!viewPassword)}
                                    className="text-gray-500 text-xl"
                                >
                                    {viewPassword ? <LuEye /> : <LuEyeOff />}
                                </button>
                            </div>
                            <div className="flex flex-row items-center bg-gray-100 rounded-xl px-2 shadow-inner border-2 border-gray-200">
                                <LuKeyRound className="text-xl mr-2 text-gray-500" />
                                <input
                                    placeholder="Confirmar contraseña"
                                    value={passwords.password_confirmation}
                                    className="bg-transparent h-10 w-64 px-2 rounded-r-xl outline-none"
                                    type={viewPassword ? "text" : 'password'}
                                    onChange={(e) => setPasswords({ ...passwords, password_confirmation: e.target.value })}
                                />
                            </div>
                        </>
                    )}

                    {error && <p className="text-lobster underline text-sm font-semibold text-center mt-1">{error}</p>}
                    {successMessage && <p className="text-green-600 text-sm font-semibold text-center mt-1">{successMessage}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex flex-row items-center gap-x-2 w-80 mx-auto mt-3 justify-center font-bold
                        py-3 rounded-lg transition-colors duration-200 bg-apricot-l1 hover:bg-apricot-l2 text-mauve-d2 disabled:opacity-50"
                    >
                        {loading && <CgSpinner className="animate-spin text-xl" />}
                        <span className="font-manrope">
                            {loading ? 'Cargando...' : (
                                <>
                                    {step === 1 && "Enviar código"}
                                    {step === 2 && "Validar código"}
                                    {step === 3 && "Restablecer"}
                                </>
                            )}
                        </span>
                        {!loading && <IoMdArrowForward />}
                    </button>
                </form>

                <div className="flex flex-col gap-y-2 items-center text-sm font-manrope">
                    <Link
                        href="/desktop/auth/login"
                        className="text-neutral-900 font-semibold hover:underline"
                    >
                        Volver al inicio de sesión
                    </Link>
                </div>
            </div>

            <div className="w-2/3 h-full p-4">
                <img src="/desktop/login-bg.png" className="object-cover w-full h-full rounded-2xl shadow-lg" />
            </div>
        </section>
    )
}
