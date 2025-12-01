'use client'

import { CgSpinner } from "react-icons/cg";
import { LuMail, LuUser, LuPhone, LuKeyRound, LuEye, LuEyeOff } from "react-icons/lu";
import { IoMdArrowForward } from "react-icons/io";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useRegister } from "@/hooks/useAuth";
import { useGeneralStore } from "@/stores/useGeneralStore";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function Register() {
    const router = useRouter()
    const updateUser = useGeneralStore(state => state.updateUser)

    const [registerValues, setRegisterValues] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: ""
    })

    const [viewPassword, setViewPassword] = useState<boolean>(false)
    const [error, setError] = useState<null | string>(null)
    const [loading, setLoading] = useState(false)

    const handleRegister = async () => {
        setError(null)

        if (Object.values(registerValues).some(val => val.trim() === '')) {
            setError('Por favor, completá todos los campos.')
            return
        }

        if (registerValues.password !== registerValues.password_confirmation) {
            setError('Las contraseñas no coinciden.')
            return
        }

        if (registerValues.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.')
            return
        }

        setLoading(true)

        const registerData = await useRegister(registerValues)

        if (!registerData.success) {
            setError(registerData.message || "Error desconocido")

            setLoading(false)
        } else {
            console.log(registerData)
            updateUser(registerData.user)

            localStorage.setItem('token', registerData.token)
            document.cookie = `token=${registerData.token}; path=/; max-age=${60 * 60 * 24 * 7}`
            localStorage.setItem('user', JSON.stringify(registerData.user))
            localStorage.setItem('lastActive', Date.now().toString())

            router.push('/')
        }

        setLoading(false)
    }

    return (
        <section className="flex flex-row w-full h-screen bg-white">
            <div className="flex flex-col w-1/3 items-center justify-center gap-y-4 py-8 overflow-y-auto">
                <div className="flex flex-col items-center">
                    <img src="/shared/mango-icon.png" width={80} height={80} className="mb-4" />

                    <span className="tracking-tight text-gray-500 font-semibold font-manrope text-sm">Registrarse en</span>
                    <span className="text-2xl font-bold tracking-tight font-grotesk text-[#141414]">Mango</span>

                    <button
                        onClick={() => null}
                        className="flex flex-row items-center justify-center gap-x-2 mt-3 mb-2 py-3 w-80 
                        rounded-md bg-neutral-800 hover:bg-neutral-700 transition-colors duration-200"
                    >
                        <FcGoogle className="text-2xl" />
                        <p className="text-white font-manrope font-semibold text-sm">
                            Registrarse con Google
                        </p>
                    </button>

                    <div className="flex items-center w-full my-2">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <span className="px-4 font-semibold font-manrope text-gray-400 text-sm">o</span>
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>
                </div>

                <form
                    className="flex flex-col gap-y-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleRegister();
                    }}
                >
                    <div className="flex flex-row items-center bg-gray-100 rounded-xl pl-2 shadow-inner border-2 border-gray-200">
                        <LuUser className="text-xl mr-2 text-gray-500" />
                        <input
                            placeholder="Nombre de usuario"
                            value={registerValues.username}
                            className="bg-transparent h-10 w-64 px-2 rounded-r-xl outline-none font-manrope"
                            type="text"
                            onChange={(e) => setRegisterValues({ ...registerValues, username: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-row items-center bg-gray-100 rounded-xl pl-2 shadow-inner border-2 border-gray-200">
                        <LuMail className="text-xl mr-2 text-gray-500" />
                        <input
                            placeholder="Tu email"
                            value={registerValues.email}
                            className="bg-transparent h-10 w-64 px-2 rounded-r-xl outline-none font-manrope"
                            type="email"
                            onChange={(e) => setRegisterValues({ ...registerValues, email: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-row items-center bg-gray-100 rounded-xl pl-2 shadow-inner border-2 border-gray-200">
                        <LuPhone className="text-xl mr-2 text-gray-500" />
                        <input
                            placeholder="Teléfono"
                            value={registerValues.phone}
                            className="bg-transparent h-10 w-64 px-2 rounded-r-xl outline-none font-manrope"
                            type="tel"
                            onChange={(e) => setRegisterValues({ ...registerValues, phone: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-row items-center bg-gray-100 rounded-xl px-2 shadow-inner border-2 border-gray-200">
                        <LuKeyRound className="text-xl mr-2 text-gray-500" />
                        <input
                            placeholder="Contraseña"
                            value={registerValues.password}
                            className="bg-transparent h-10 w-64 px-2 rounded-r-xl outline-none"
                            type={viewPassword ? "text" : 'password'}
                            onChange={(e) => setRegisterValues({ ...registerValues, password: e.target.value })}
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
                            value={registerValues.password_confirmation}
                            className="bg-transparent h-10 w-64 px-2 rounded-r-xl outline-none"
                            type={viewPassword ? "text" : 'password'}
                            onChange={(e) => setRegisterValues({ ...registerValues, password_confirmation: e.target.value })}
                        />
                        {/* Empty placeholder to align input width with the password field above */}
                        <div className="w-5"></div>
                    </div>

                    {error && <p className="text-lobster underline text-sm font-semibold text-center mt-1">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex flex-row items-center gap-x-2 w-80 mx-auto mt-2 justify-center font-bold
                        py-3 rounded-lg transition-colors duration-200 bg-apricot-l1 hover:bg-apricot-l2 text-mauve-d2 disabled:opacity-50"
                    >
                        {loading && <CgSpinner className="animate-spin text-xl" />}
                        <span className="font-manrope">{loading ? 'Cargando...' : 'Creá tu cuenta'}</span>
                        {!loading && <IoMdArrowForward />}
                    </button>
                </form>

                <div className="flex flex-col gap-y-2 items-center text-sm font-manrope mt-2">
                    <div className="flex flex-row items-center ">
                        <p>¿Ya tenés cuenta?</p>&nbsp;
                        <Link
                            href="/desktop/auth/login"
                            className="text-neutral-900 font-semibold hover:underline"
                        >
                            Iniciá sesión
                        </Link>
                    </div>
                </div>
            </div>

            <div className="w-2/3 h-full p-4">
                <img src="/desktop/register-bg.png" className="object-cover w-full h-full rounded-2xl shadow-lg" />
            </div>
        </section>
    )
}