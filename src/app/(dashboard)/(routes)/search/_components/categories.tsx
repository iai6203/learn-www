"use client"

import React from "react"
import type { Category } from "@prisma/client"
import type { IconType } from "react-icons"
import {
  FaCode,
  FaGamepad,
  FaDatabase,
  FaRobot,
  FaShieldAlt,
  FaPaintBrush,
  FaRegListAlt,
} from "react-icons/fa"
import { MdWork } from "react-icons/md"
import { PiComputerTower } from "react-icons/pi"
import { IoLanguage, IoSchool } from "react-icons/io5"

import { CategoryItem } from "./category-item"

interface CategoriesProps {
  items: Category[]
}

const iconMap: Record<Category["name"], IconType> = {
  "개발 · 프로그래밍": FaCode,
  "게임 개발": FaGamepad,
  "데이터 사이언스": FaDatabase,
  "인공지능": FaRobot,
  "보안 · 네트워크": FaShieldAlt,
  "비즈니스 · 마케팅": MdWork,
  "하드웨어": PiComputerTower,
  "디자인": FaPaintBrush,
  "학문 · 외국어": IoLanguage,
  "커리어": FaRegListAlt,
  "자기계발": IoSchool,
}

export function Categories({
  items,
}: CategoriesProps) {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  )
}
