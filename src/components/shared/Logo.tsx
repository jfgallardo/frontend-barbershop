import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
    return (
        <Link href="/" className="flex items-center h-14">
            <Image src="/logo.png" alt="Logo" width={125} height={65} className='object-fill' />
            <div className="flex flex-col justify-center h-full">
                <span className="text-lg sm:text-2xl font-extralight leading-6 tracking-widest text-gradient">
                    Samuel Francisco
                </span>
                <span className="text-[16px] sm:text-[24px] font-bold leading-6 pl-px text-gradient">
                    BarberShop
                </span>
            </div>
        </Link>
    )
}
