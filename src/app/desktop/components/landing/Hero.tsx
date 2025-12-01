export const Hero = () => {
    return (
        <div className="w-screen h-screen flex flex-col gap-y-3 items-center justify-center">
            <a className="w-32 h-10 bg-black text-white flex items-center justify-center rounded-lg" href="/auth/login">
                Logueate
            </a>

            <a className="w-32 h-10 bg-black text-white flex items-center justify-center rounded-lg" href="/auth/register">
                Registrate
            </a>
        </div>
    )
}