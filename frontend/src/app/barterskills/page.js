'use client';
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import SkillShare from './skill-share';

export default function Example() {
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 min-h-screen">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute left-[50%] top-0 h-full w-[200%] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]"
        >
          <defs>
            <pattern
              id="pattern-grid"
              x="50%"
              y="0"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#pattern-grid)" />
        </svg>
      </div>
      <div className="mx-36 flex">
        <div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            Barter skills
          </h1>
          <p className="mt-6 text-xl/8 text-gray-700">
            An interface where you can share skills for free
          </p>
          <div className="text-base/7 text-gray-700">
            <ul role="list" className="mt-8 space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <span>
                  <strong className="font-semibold text-gray-900">Provide</strong> Contibute a skill to the community
                </span>
              </li>
              <li className="flex gap-x-3">
                <span>
                  <strong className="font-semibold text-gray-900">Gain</strong> Upskill yourself by learning from others
                </span>
              </li>
              <li className="flex gap-x-3">
                <span>
                  <strong className="font-semibold text-gray-900">Free</strong> Barter skills at no expense, completely for free
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <SkillShare />
        </div>
      </div>
    </div>
  );
}
