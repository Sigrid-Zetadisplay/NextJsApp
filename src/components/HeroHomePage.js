import Image from 'next/image';
import { motion } from 'framer-motion';

export const HeroSection = ({ session }) => {
	if (session) return null;

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="relative flex items-center justify-center py-20 min-h-[60vh] bg-white overflow-hidden"
		>
			{/* Bakgrunnsbilde med next/image */}
			<div className="absolute inset-0 z-0 opacity-20">
				<Image
					src="https://i.imghippo.com/files/cCe8948yAg.png"
					alt="Background"
					fill
					className="object-cover"
					sizes="100vw"
					priority
				/>
			</div>

			{/* Innhold */}
			<div className="relative z-10 text-center max-w-2xl px-6">
				<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
					Dora The Wine Explorer
				</h1>
				<blockquote className="text-lg text-gray-700 font-medium">
					<p>
						Welcome to this honest and informative website. Here you will find
						interesting information about the most important things in life.
					</p>
				</blockquote>
			</div>
		</motion.section>
	);
};
