"use client"

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link';
import gsap from 'gsap'
import { ArrowDownIcon, CrossIcon, MenuIcon, ShoppingBag, X } from 'lucide-react';

const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Our Story", href: "/story" },
    { label: "Contact", href: "/contact" },
];

const Menu = () => {
    const [isActive, setIsActive] = useState(false);
    const itemRefs = useRef([]);
    const menuRef = useRef(null);
    const menuAnimationRef = useRef(null);

    useEffect(() => {
        itemRefs.current.forEach((itemRef) => {
            if (!itemRef) return;

            const mainText = itemRef.querySelector('.main-text');
            const hoverText = itemRef.querySelector('.hover-text');

            if (mainText && hoverText) {
                gsap.set([mainText, hoverText], {
                    position: 'absolute',
                    width: '100%',
                    left: 0
                });
                gsap.set(hoverText, { y: '100%', opacity: 0 });
            }

            itemRef.addEventListener('mouseenter', () => {
                if (mainText && hoverText) {
                    gsap.timeline()
                        .to(mainText, {
                            y: '-100%',
                            opacity: 0,
                            duration: 0.3,
                            ease: 'power2.in'
                        })
                        .to(hoverText, {
                            y: '0%',
                            opacity: 1,
                            duration: 0.3,
                            ease: 'power2.out'
                        }, '-=0.2');
                }
            });

            itemRef.addEventListener('mouseleave', () => {
                if (mainText && hoverText) {
                    gsap.timeline()
                        .to(hoverText, {
                            y: '100%',
                            opacity: 0,
                            duration: 0.3,
                            ease: 'power2.in'
                        })
                        .to(mainText, {
                            y: '0%',
                            opacity: 1,
                            duration: 0.3,
                            ease: 'power2.out'
                        }, '-=0.2');
                }
            });
        });
    }, []);

    useEffect(() => {
        if (menuRef.current) {
            menuAnimationRef.current = gsap.timeline({ paused: true });

            gsap.set(menuRef.current, { x: '100%' });

            menuAnimationRef.current.to(menuRef.current, {
                x: '0%',
                duration: 0.6,
                ease: 'power2.inOut'
            });

            if (itemRefs.current) {
                menuAnimationRef.current.fromTo(
                    itemRefs.current,
                    {
                        x: 50,
                        opacity: 0
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.4,
                        stagger: 0.1,
                        ease: 'power2.out'
                    },
                    "-=0.3"
                );
            }

            menuAnimationRef.current.reverse();
        }
    }, []);

    const toggleMenu = () => {
        setIsActive(!isActive);

        if (menuAnimationRef.current) {
            if (isActive) {
                menuAnimationRef.current.reverse();
            } else {
                menuAnimationRef.current.play();
            }
        }
    };

    return (
        <>
            <div className='fixed top-4 right-4 z-50 flex items-center justify-center gap-x-5'>

                <Link href={"/shop"}
                    className={`hover:opacity-75 text-[#e1e1e1] duration-300 hover:text-[#e1e1e1] text-md border border-[#e1e1e1] rounded-full p-0 px-3 py-1 m-0 ${isActive && "hiddden"} `}
                >
                    <span className='flex items-center justify-center gap-2' >
                        <ShoppingBag size={14} />
                        Shop</span>
                </Link>
                <button
                    onClick={toggleMenu}
                    className="hover:opacity-75 text-[#e1e1e1] duration-300 hover:text-[#e1e1e1] text-md border border-[#e1e1e1] rounded-full p-0 px-3 py-1 m-0"
                >
                    {isActive ? <span className='flex items-center justify-center gap-2 text-neutral-700 border-neutral-300'>
                        <X />
                        Close</span> : <span className='flex items-center justify-center gap-2' >
                        <MenuIcon size={14} />
                        Menu</span>}
                </button>
            </div>

            <div
                ref={menuRef}
                className='fixed top-0 right-0 w-[30vw] px-6 py-16 bg-[#e1e1e1] h-screen flex flex-1 items-start justify-start flex-col space-y-6 z-40 transform translate-x-full'
            >
                {menuItems.map((item, index) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        ref={el => itemRefs.current[index] = el}
                        className='relative h-8 w-full border-b border-b-neutral-500 px-2 py-4 overflow-hidden cursor-pointer'
                    >
                        <h4 className='main-text flex w-full items-center justify-between text-xl text-neutral-700 uppercase absolute top-0 left-0'>
                            {item.label}
                            <span className='-rotate-90'>
                                <ArrowDownIcon />
                            </span>
                        </h4>
                        <h4 className='hover-text flex w-full items-center justify-between text-xl uppercase text-[#ED6370] absolute top-0 left-0'>
                            {item.label}
                            <span className='-rotate-90'>
                                <ArrowDownIcon />
                            </span>
                        </h4>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Menu