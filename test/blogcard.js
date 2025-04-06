/** @format */

import Image from 'next/image';

export default function CenteredSection({ session }) {
	if (session) return null;

	return (
		<section className="flex flex-col items-center justify-center min-h-screen bg-white px-6 py-24 sm:py-32 lg:px-8">
			<div className="w-full max-w-xs sm:max-w-md">
				<Image
					alt="Company logo"
					src="https://i.imghippo.com/files/qF7023Nk.png"
					width={700}
					height={200}
					className="mx-auto h-auto"
				/>
			</div>

			<figure className="mt-12 text-center max-w-2xl">
				<blockquote className="text-xl sm:text-2xl font-semibold leading-relaxed text-gray-800">
					<p>
						“Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
						expedita voluptas culpa sapiente alias molestiae. Numquam corrupti
						in laborum sed rerum et corporis.”
					</p>
				</blockquote>
				<figcaption className="mt-10 flex justify-center">
					<div className="w-24 h-24">
						<Image
							alt="Author profile picture"
							src="https://i.imghippo.com/files/qF7023Nk.png"
							width={200}
							height={200}
							className="object-cover rounded-full"
						/>
					</div>
				</figcaption>
			</figure>
		</section>
	);
}


        <figcaption className="mt-10 flex flex-col items-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24">
            <Image
              alt="Author profile picture"
              src="https://i.imghippo.com/files/qF7023Nk.png"
              width={200}
              height={200}
              className="object-cover rounded-full"
            />
          </div>
          <div className="mt-4 text-sm text-gray-600">SigridL— CEO</div>
        </figcaption>