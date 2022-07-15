import { useEffect, useMemo, useRef, useState } from "react"
import { BlockDefinitions, EArticleBlocks, InstantiableArticleBlocksList } from "../Elements/Blocks"
import { ContextualMenu } from "../../../Menus/ContextualMenu"
import { BlockMenu } from "./BlockMenu"
import { ContextualMenuItems } from "../../../Menus/ContextualMenuItems"
import { withStopPropagation } from "../../../../utils/events"

interface Props {
  onClose: () => void
  onAddBlock: (element: any) => void
  className?: string
}
export function AddBlock({
  onClose,
  onAddBlock,
  className,
}: Props) {
  // a list of the button-instantiable elements
  const instantiable = useMemo(() => {
    return InstantiableArticleBlocksList.map(
      type => BlockDefinitions[type as EArticleBlocks]
    ).filter(
      definition => !!definition.buttonInstantiable
    )
  }, [])

  return (
    <BlockMenu
      className={className}
      onClose={onClose}
    >
      <ContextualMenuItems>
        {instantiable.map((def) => (
          <button
            key={def.name}
            type="button"
	    onClick={withStopPropagation(
	      () => onAddBlock(def.instanciateElement!())
	    )}
          >
            {def.icon}
            <span>{def.name}</span>
          </button>
        ))}
      </ContextualMenuItems>
    </BlockMenu>
  )
}
