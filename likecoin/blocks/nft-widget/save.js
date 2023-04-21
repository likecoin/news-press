/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
  const {
    iscnId,
    isShowCover,
    isShowLikeBar,
  } = attributes;
  let querystring = `type=wp&integration=wordpress_plugin&iscn_id=${encodeURIComponent(iscnId)}`;
  let height = 440;
  if (!isShowCover) {
    querystring += '&cover=0';
    height -= 260;
  }
  if (!isShowLikeBar) {
    querystring += '&like_bar=0';
    height -= 60;
  }
  return (
    <figure {...useBlockProps.save()}>
      {iscnId && <iframe
        title={__('NFT Widget', 'likecoin')}
        frameborder="0"
        style={{ height: `${height}px`, width: '360px' }}
        src={`https://button.like.co/in/embed/iscn/button?${querystring}`}
      />}
    </figure>
  );
}
