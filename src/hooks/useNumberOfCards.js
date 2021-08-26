import { useState } from "react";
import {
  INITIAL_MOBILE_NUMBER_OF_CARDS,
  INITIAL_TABLET_NUMBER_OF_CARDS,
  INITIAL_COMPUTER_NUMBER_OF_CARDS,
} from "../utils/utils";

export function useNumberOfCards() {
  const [currentShownCardsNumber, setCurrentShownCardsNumber] = useState(0);
  const [windowWidth, setWindowWidth] = useState(document.body.clientWidth);
  const MOBILE = windowWidth >= 320 && windowWidth <= 689;
  const TABLET = windowWidth > 689 && windowWidth < 1088;
  const COMPUTER = windowWidth >= 1088;

  //определить ширину экрана устройства пользователя
  const checkWindowWidth = () => {
    setWindowWidth(document.body.clientWidth);
  };

  //установить начальное значение количества показываемых карточек
  const setInitialNumberOfCards = () => {
    if (MOBILE) {
      setCurrentShownCardsNumber(INITIAL_MOBILE_NUMBER_OF_CARDS);
    } else if (TABLET) {
      setCurrentShownCardsNumber(INITIAL_TABLET_NUMBER_OF_CARDS);
    } else if (COMPUTER) {
      setCurrentShownCardsNumber(INITIAL_COMPUTER_NUMBER_OF_CARDS);
    }
  };

  //установить текущее значение количества показываемых карточек
  const setNumberOfShownCards = () => {
    if (MOBILE) {
      setCurrentShownCardsNumber(
        Math.max(INITIAL_MOBILE_NUMBER_OF_CARDS, currentShownCardsNumber)
      );
    } else if (TABLET) {
      setCurrentShownCardsNumber(
        Math.max(INITIAL_TABLET_NUMBER_OF_CARDS, currentShownCardsNumber)
      );
    } else if (COMPUTER) {
      setCurrentShownCardsNumber(
        Math.max(INITIAL_COMPUTER_NUMBER_OF_CARDS, currentShownCardsNumber)
      );
    }
  };

  //загрузить следующий ряд карточек
  function handleMoreButtonClick() {
    if (MOBILE) {
      setCurrentShownCardsNumber(currentShownCardsNumber + 2);
    } else if (TABLET) {
      setCurrentShownCardsNumber(currentShownCardsNumber + 2);
    } else if (COMPUTER) {
      setCurrentShownCardsNumber(currentShownCardsNumber + 3);
    }
  };

  return {
    currentShownCardsNumber,
    checkWindowWidth,
    setInitialNumberOfCards,
    setNumberOfShownCards,
    handleMoreButtonClick
  };
}
