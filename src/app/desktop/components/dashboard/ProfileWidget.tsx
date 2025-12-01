import { MdOutlineWorkspacePremium } from "react-icons/md"

export const ProfileWidget = () => {
    return (
        <div className="flex flex-col gap-y-2 bg-white w-120 p-6 rounded-2xl border border-mauve/20">
            <div className="flex flex-row gap-x-6">
                <div className="flex items-center justify-center size-16 bg-blue-600 rounded-full">
                    <span className="text-4xl font-manrope text-white">B</span>
                </div>

                <div className="flex flex-col">
                    <span className="font-grotesk text-2xl font-bold tracking-tight">
                        Bautista Sánchez
                    </span>

                    <span className="font-manrope text-gray-600 -mt-px">
                        2f.sanchezbautista@gmail.com
                    </span>
                </div>

                <MdOutlineWorkspacePremium 
                    className="text-2xl text-apricot-d1 ml-auto" 
                />
            </div>
        </div>
    )
}