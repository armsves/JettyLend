import React from 'react';

interface NftCardProps {
  id: string;
  resourceAddress: string;
  imageUrl: string;
}

const NftCard: React.FC<NftCardProps> = ({ id, resourceAddress, imageUrl }) => {
  return (
    <div className="nft-card">
      <img src={imageUrl} alt={`NFT ${id}`} className="nft-card-image" />
      <div className="nft-card-content">
        <p>Name: {id}</p>
      </div>
    </div>
  );
};

export default NftCard;