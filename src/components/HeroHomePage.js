/** @format */

// components/HeroHomePage.js
import Image from 'next/image';
import { motion } from 'framer-motion';

export const HeroSection = ({ session }) => {
	if (session) return null;

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="flex flex-col items-center py-16 bg-white ml-5 ">
			<div className="w-full max-w-s">
				<Image
					alt="Company logo"
					src="https://i.imghippo.com/files/qF7023Nk.png"
					width={500}
					height={200}
					className="rounded-full"
				/>
			</div>

			<figure className="mt-12 text-center max-w-xs px-4 sm:px-0">
				<blockquote className="font-semibold leading-relaxed text-gray-800">
					<p>
						Dora The Wine Explorer. Welcome to this honest and informative
						website. Here you will find interesting information about the most
						important things in life.
					</p>
				</blockquote>
			</figure>
		</motion.section>
	);
};
