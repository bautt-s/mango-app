'use client'

import { CgSpinner } from "react-icons/cg";
import { LuMail, LuKeyRound, LuEye, LuEyeOff } from "react-icons/lu";
import { IoMdArrowForward } from "react-icons/io";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useLogin } from "@/hooks/useAuth";
import { useGeneralStore } from "@/stores/useGeneralStore";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function Login() {
    const router = useRouter()

    const updateUser = useGeneralStore(state => state.updateUser)

    const [authValues, setAuthValues] = useState({
        email: "",
        password: ""
    })

    const [viewPassword, setViewPassword] = useState<boolean>(false)

    const [error, setError] = useState<null | string>(null)
    const [loading, setLoading] = useState(false)

    const login = async () => {
        if (!authValues.email) {
            setError('Debes ingresar un email.')
            return
        }

        setLoading(true)
        setError(null)

        const loginData = await useLogin(authValues)

        if (!loginData.success) {
            setError(loginData.message || "Error desconocido")
            setLoading(false)
            // TODO: error feedback
        } else {
            updateUser(loginData.user)

            localStorage.setItem('token', loginData.token)
            document.cookie = `token=${loginData.token}; path=/; max-age=${60 * 60 * 24 * 7}`
            localStorage.setItem('user', JSON.stringify(loginData.user))
            localStorage.setItem('lastActive', Date.now().toString())

            router.push('/user/dashboard')
        }
    }

    return (
        <section className="flex flex-row-reverse w-full h-screen bg-white">
            <div className="flex flex-col w-1/3 items-center justify-center gap-y-6 mt-4">
                <div className="flex flex-col items-center">
                    <img src="/shared/mango-icon.png" width={80} height={80} className="mb-4" />

                    <span className="tracking-tight text-gray-500 font-semibold font-manrope text-sm">Entrar a</span>
                    <span className="text-2xl font-bold tracking-tight font-grotesk text-[#141414]">Mango</span>

                    <button
                        onClick={() => null}
                        aria-label="Entrar con Google"
                        className="flex flex-row items-center justify-center gap-x-2 mt-4 mb-2 py-3 w-80 
                        rounded-md bg-neutral-800 hover:bg-neutral-700 transition-colors duration-200"
                    >
                        <FcGoogle className="text-2xl" />
                        <p className="text-white font-manrope font-semibold text-sm">
                            Entrar con Google
                        </p>
                    </button>

                    <div className="flex items-center w-full my-4">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <span className="px-4 font-semibold font-manrope text-gray-400">or</span>
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>

                    <p className="text-neutral-700 font-manrope font-semibold">
                        Autenticate usando tu usuario y contraseña.
                    </p>
                </div>

                <form
                    className="flex flex-col gap-y-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        login();
                    }}
                >
                    <div className="flex flex-row items-center bg-gray-100 rounded-xl pl-2 shadow-inner border-2 border-gray-200">
                        <LuMail className="text-xl mr-2 text-gray-500" />
                        <input
                            placeholder="Tu email" value={authValues.email}
                            className="bg-transparent h-10 w-64 px-2 rounded-r-xl outline-none font-manrope"
                            type="email"
                            onChange={(e) => setAuthValues({ ...authValues, email: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-row items-center bg-gray-100 rounded-xl px-2 shadow-inner border-2 border-gray-200">
                        <LuKeyRound className="text-xl mr-2 text-gray-500" />
                        <input
                            placeholder="Tu contraseña"
                            value={authValues.password}
                            className="bg-transparent h-10 w-64 px-2 rounded-r-xl outline-none"
                            type={viewPassword ? "text" : 'password'}
                            onChange={(e) => setAuthValues({ ...authValues, password: e.target.value })}
                        />

                        <button
                            type="button"
                            onClick={() => setViewPassword(!viewPassword)}
                            className="text-gray-500 text-xl"
                        >
                            {viewPassword ? <LuEye /> : <LuEyeOff />}
                        </button>
                    </div>

                    {error && <p className="text-lobster underline text-sm font-semibold text-center mt-1">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex flex-row items-center gap-x-2 w-80 mx-auto mt-3 justify-center font-bold
                        py-3 rounded-lg transition-colors duration-200 bg-apricot-l1 hover:bg-apricot-l2 text-mauve-d2 disabled:opacity-50"
                    >
                        {loading && <CgSpinner className="animate-spin text-xl" />}
                        <span className="font-manrope">{loading ? 'Cargando...' : 'Ingresar'}</span>
                        {!loading && <IoMdArrowForward />}
                    </button>
                </form>

                <div className="flex flex-col gap-y-2 items-center text-sm font-manrope">
                    <Link
                        href="/auth/forgot-password"
                        aria-label="¿Olvidaste tu contraseña?"
                        className="text-neutral-900 font-semibold hover:underline"
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>

                    <div className="flex flex-row items-center">
                        <p>Si no tenés cuenta,</p>&nbsp;
                        <Link
                            href="/desktop/auth/register"
                            aria-label="¿Olvidaste tu contraseña?"
                            className="text-neutral-900 font-semibold hover:underline"
                        >
                            registrate
                        </Link>
                    </div>
                </div>
            </div>

            <div className="w-2/3 h-full p-4">
                <img src="/desktop/login-bg.png" className="object-cover w-full h-full rounded-2xl shadow-lg" />
            </div>
        </section>
    )
}