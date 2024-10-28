import React from 'react'

/**
 * SkeletonLoading component
 * 
 * Displays a skeleton loading placeholder animation.
 * Useful for providing a loading indicator while data is being fetched.
 * 
 * @component
 * @example
 * return (
 *   <SkeletonLoading />
 * )
 */
function SkeletonLoading() {
  return (
    <div> <div className="skeleton-content">
    <div className="skeleton skeleton-title"></div>
    <div className="skeleton skeleton-paragraph">
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
    </div>
</div></div>
  )
}

export default SkeletonLoading