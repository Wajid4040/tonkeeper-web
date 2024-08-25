import { CarouselApp } from '@tonkeeper/core/dist/tonkeeperApi/tonendpoint';
import { ComponentProps, FC, useEffect } from 'react';
import styled from 'styled-components';
import { Carousel } from '../shared';
import { useAppContext } from '../../hooks/appContext';
import { useOpenLinkOnAreaClick } from '../../hooks/useAreaClick';

// Define the CarouselWrapper to make the background image cover the entire screen
const CarouselWrapper = styled.div`
    width: 100%; /* Full width */
    height: 80vh; /* Full height */
    position: relative;
    overflow: hidden; /* Hide any overflow to prevent scrollbars */
    background-image: url('/browserimg.webp');
    background-size: cover; /* Cover the entire screen */
    background-repeat: no-repeat;
    background-position: center;
    cursor: default; /* Disable the pointer cursor */
    
    /* Add a text overlay */
    &::before {
        content: 'MEGAPAYER';
        position: absolute;
        top: 5%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2.6rem;
        color: white;
        font-family: 'Arial', sans-serif;
        font-weight: bold;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        text-align: center;
        pointer-events: none;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        letter-spacing: 1px;
    }
`;

const ButtonsWrapper = styled.div`
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    gap: 16px;
    z-index: 10;
`;

const Button = styled.button`
background: linear-gradient(90deg, #6ddcb2, #388573); /* Gradient background */
    border: none;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        background: linear-gradient(90deg, #388573, #6ddcb2); /* Inverted gradient on hover */
    }
`;

export const PromotionsCarousel: FC<
    { apps: CarouselApp[]; className?: string } & Partial<ComponentProps<typeof Carousel>>
> = ({ apps, className, ...rest }) => {
    const { config } = useAppContext();
    const speed = config.featured_play_interval || 1000 * 10;

    useEffect(() => {
        // Disable body scrolling when this component is mounted
        document.body.style.overflow = 'hidden';

        // Re-enable scrolling when this component is unmounted
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <CarouselWrapper>
            <Carousel
                className={className}
                gap="8px"
                autoplay={true}
                centerPadding="16px"
                autoplaySpeed={speed}
                {...rest}
            >
                {/* Add your carousel items here */}
            </Carousel>
            <ButtonsWrapper>
                <Button >
                    Megapayer P2P
                </Button>
                <Button >
                    Megapayer Dex
                </Button>
            </ButtonsWrapper>
        </CarouselWrapper>
    );
};

const CarouselItem: FC<{ item: CarouselApp }> = ({ item }) => {
    const { tonendpoint } = useAppContext();
    const ref = useOpenLinkOnAreaClick(item.url, 'featured', tonendpoint.getTrack());

    return (
        <div ref={ref} style={{ width: '100%', height: '100%' }}>
            {/* Content removed to ensure only the card structure is displayed */}
        </div>
    );
};
