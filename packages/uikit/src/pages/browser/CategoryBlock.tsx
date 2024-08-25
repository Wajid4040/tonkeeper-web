import { PromotedApp, PromotionCategory } from '@tonkeeper/core/dist/tonkeeperApi/tonendpoint';
import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronRightIcon } from '../../components/Icon';
import { Body3, H3, Label1, Label2 } from '../../components/Text';
import { useAppContext } from '../../hooks/appContext';
import { useOpenLinkOnAreaClick } from '../../hooks/useAreaClick';
import { useElementSize } from '../../hooks/useElementSize';
import { BrowserRoute } from '../../libs/routes';

// Styled components
const Heading = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 1rem;
    gap: 1rem;
`;

const AllButton = styled.button`
    border: none;
    background: transparent;
    color: ${props => props.theme.textAccent};
    cursor: pointer;
    padding: 4px 8px;
`;

const Container = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
`;

const GroupContainer = styled.div<{ width: string; marginLeft?: string }>`
    width: ${props => props.width};
    margin-left: ${props => props.marginLeft};
    margin-bottom: 0;
    display: flex;
    overflow-x: auto; /* Allows horizontal scrolling if needed */
    gap: 8px;
`;

const PromotedItem = styled.div`
    padding: 10px;
    height: 76px;
    display: flex;
    align-items: center;
    width: 100%;
    background-color: white; /* White background */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Subtle box shadow */
    border-radius: 10px; /* Rounded corners */
`;

const PromotedItemImage = styled.img`
    height: 44px;
    width: 44px;
    border-radius: 10px;
`;

const PromotedItemText = styled.div<{ color?: string }>`
    display: flex;
    min-width: 0;
    flex-direction: column;
    padding: 11px 12px 13px;
    color: ${props => props.color || props.theme.textPrimary};

    & > span:nth-child(2) {
        opacity: 0.78;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        max-height: 32px;
    }
`;

const IconContainerStyled = styled.div`
    margin-left: auto;
    color: ${props => props.theme.iconTertiary};
    transition: transform 0.15s ease;
`;

const ListItemStyled = styled.div`
    display: flex;
    align-items: center;
    padding-left: 1rem;
    cursor: pointer;

    &:hover ${IconContainerStyled} {
        transform: translateX(2px);
    }
`;

export const CategoryBlock: FC<{ category: PromotionCategory; className?: string }> = ({
    category,
    className
}) => {
    const [containerRef, { width: containerWidth }] = useElementSize();
    const width = containerWidth - 36;
    const groups = useMemo(
        () =>
            category.apps.reduce((acc, app, index) => {
                if (index % 3 === 0) {
                    acc.push([app]);
                } else {
                    acc[acc.length - 1].push(app);
                }
                return acc;
            }, [] as PromotedApp[][]),
        [category.apps]
    );

    const groupsKeys = useMemo(() => groups.map(group => group.map(i => i.url).join('')), [groups]);
    const canExpand = groups.length > 1;

    return (
        <div className={className} ref={containerRef}>
           
            <Container>
                {canExpand ? (
                    <GroupContainer
                        width="100%"
                    >
                       
                    </GroupContainer>
                ) : (
                    groups.map((group, groupIndex) => (
                        <Container key={groupsKeys[groupIndex]}>
                            
                        </Container>
                    ))
                )}
            </Container>
        </div>
    );
};

export const CategoryGroupItem: FC<{ item: PromotedApp }> = ({ item }) => {
    const { tonendpoint } = useAppContext();
    const ref = useOpenLinkOnAreaClick(item.url, 'recommendation', tonendpoint.getTrack());

    return (
        <ListItemStyled ref={ref}>
            <PromotedItem>
                <PromotedItemImage  />
                <PromotedItemText>
                    <Label2>{item.name}</Label2>
                    <Body3>{item.description}</Body3>
                </PromotedItemText>
                <IconContainerStyled>
                    <ChevronRightIcon />
                </IconContainerStyled>
            </PromotedItem>
        </ListItemStyled>
    );
};
