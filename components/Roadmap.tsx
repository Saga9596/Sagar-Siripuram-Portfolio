import React, { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/Tooltip";
import { useIsMobile } from "../helpers/useIsMobile";
import { roadmapData, RoadmapNodeData } from "../helpers/roadmapData";
import { roadmapContent, RoadmapContent } from "../helpers/roadmapContent";
import { SectionExperience } from "./SectionExperience";
import * as Icons from "lucide-react";
import styles from "./Roadmap.module.css";

const getIcon = (iconName: string) => {
  const Icon = (Icons as any)[iconName];
  return Icon ? <Icon size={20} /> : <Icons.CircleDot size={20} />;
};

interface RoadmapState {
  selectedNodeId: number | null;
  expandedNodeIds: Set<number>;
  activeNodeId: number | null;
  isSectionExperienceOpen: boolean;
}

const RoadmapNode = ({
  node,
  index,
  isSubNode = false,
  isActive = false,
  isExpanded = false,
  onNodeClick,
  isRightAligned = false,
}: {
  node: RoadmapNodeData;
  index: number;
  isSubNode?: boolean;
  isActive?: boolean;
  isExpanded?: boolean;
  onNodeClick: (nodeId: number) => void;
  isRightAligned?: boolean;
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const animationDelay = `${index * 200}ms`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNodeClick(node.id);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          ref={ref}
          className={`${styles.node} ${isSubNode ? styles.subNode : ""} ${
            isIntersecting ? styles.sprout : ""
          } ${isActive ? styles.nodeActive : ""} ${isExpanded ? styles.nodeExpanded : ""} ${
            isRightAligned ? styles.nodeRightAligned : ""
          }`}
          style={{ animationDelay }}
          onClick={handleClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onNodeClick(node.id);
            }
          }}
          aria-label={`Open ${node.title} content`}
        >
          <div className={styles.nodeIcon}>{getIcon(node.icon)}</div>
          <div className={styles.ecoPulse}></div>
          {node.co2Saved && (
            <div className={styles.co2Badge}>
              <span>{node.co2Saved}t CO₂</span>
            </div>
          )}
          <div className={styles.nodeLabel} aria-hidden="true">
            {node.title}
          </div>
          {!isSubNode && <div className={styles.branchConnector}></div>}
        </div>
      </TooltipTrigger>
      <TooltipContent aria-hidden="true">
        <div className={styles.tooltipContent}>
          {getIcon(node.icon)}
          <span>{node.title}</span>
          {node.co2Saved && (
            <span className={styles.tooltipCo2}>({node.co2Saved}t CO₂ saved)</span>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export const Roadmap = () => {
  const isMobile = useIsMobile();
  const [roadmapState, setRoadmapState] = useState<RoadmapState>({
    selectedNodeId: null,
    expandedNodeIds: new Set(),
    activeNodeId: null,
    isSectionExperienceOpen: false,
  });

  const handleNodeClick = (nodeId: number) => {
    const node = roadmapData.find(n => n.id === nodeId) || 
                 roadmapData.find(n => n.subNodes?.some(sub => sub.id === nodeId))?.subNodes?.find(sub => sub.id === nodeId);

    if (!node) return;

    if (node.subNodes && node.subNodes.length > 0) {
      setRoadmapState(prev => ({
        ...prev,
        expandedNodeIds: prev.expandedNodeIds.has(nodeId)
          ? new Set([...prev.expandedNodeIds].filter(id => id !== nodeId))
          : new Set([...prev.expandedNodeIds, nodeId]),
        activeNodeId: nodeId,
        selectedNodeId: nodeId,
        isSectionExperienceOpen: true,
      }));
    } else {
      setRoadmapState(prev => ({
        ...prev,
        selectedNodeId: nodeId,
        activeNodeId: nodeId,
        isSectionExperienceOpen: true,
      }));
    }
  };

  const handleCloseSectionExperience = () => {
    setRoadmapState(prev => ({
      ...prev,
      selectedNodeId: null,
      activeNodeId: null,
      expandedNodeIds: new Set(),
      isSectionExperienceOpen: false,
    }));
  };

  const handleNavigate = (content: RoadmapContent) => {
    console.log('Navigating to content:', content.title);
  };

  const getNodeContent = (nodeId: number): RoadmapContent | undefined => {
    const mainContent = roadmapContent.find(c => c.id === nodeId);
    if (mainContent) return mainContent;

    for (const content of roadmapContent) {
      if (content.subContent) {
        const subContent = content.subContent.find(sub => sub.id === nodeId);
        if (subContent) return subContent;
      }
    }
    return undefined;
  };

  const renderPath = () => {
    const pathHeight = roadmapData.length * 300;

    return (
      <svg 
        className={styles.pathSvgVertical} 
        viewBox={`0 0 100 ${pathHeight}`}
        preserveAspectRatio="none"
      >
        <path
          d={`M 50,0 C 45,100 55,200 50,300 C 55,400 45,500 50,600 C 45,700 55,800 50,900 C 55,1000 45,1100 50,1200 C 45,1300 55,1400 50,${pathHeight}`}
          stroke="var(--path-color)"
          strokeWidth="4"
          fill="none"
          className={styles.pathTrail}
        />
        {roadmapData.map((_, index) => (
          <circle
            key={index}
            cx="50"
            cy={index * 300 + 150}
            r="8"
            fill="var(--path-progress-color)"
            opacity="0.3"
            className={styles.pathNode}
          />
        ))}
      </svg>
    );
  };

  const selectedContent = roadmapState.selectedNodeId 
    ? getNodeContent(roadmapState.selectedNodeId) ?? null
    : null;

  return (
    <div className={styles.roadmapWrapper}>
      <nav className={styles.roadmapContainer} aria-label="Portfolio Sections">
        {renderPath()}
        <div className={styles.nodesWrapper}>
          {roadmapData.map((node, index) => (
            <div key={node.id} className={styles.nodeGroup}>
              <RoadmapNode 
                node={node} 
                index={index}
                isActive={roadmapState.activeNodeId === node.id}
                isExpanded={roadmapState.expandedNodeIds.has(node.id)}
                onNodeClick={handleNodeClick}
                isRightAligned={index % 2 === 1}
              />
              {node.subNodes && roadmapState.expandedNodeIds.has(node.id) && (
                <div className={`${styles.subNodesContainer} ${styles.subNodesExpanded} ${
                  index % 2 === 1 ? styles.subNodesLeft : styles.subNodesRight
                }`}>
                  {node.subNodes.map((subNode, subIndex) => (
                    <RoadmapNode
                      key={subNode.id}
                      node={subNode}
                      index={index * 10 + subIndex}
                      isSubNode
                      isActive={roadmapState.activeNodeId === subNode.id}
                      onNodeClick={handleNodeClick}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      <SectionExperience 
        isOpen={roadmapState.isSectionExperienceOpen}
        onClose={handleCloseSectionExperience}
        content={selectedContent}
        onNavigate={handleNavigate}
        profileImageUrl={selectedContent?.id === 1 ? "/images/sagar.png" : undefined}
      />
    </div>
  );
};
