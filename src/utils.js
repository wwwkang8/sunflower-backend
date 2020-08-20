// words 파일 import
import { adjectives, nouns } from "./words";

// generateSecret 함수 정의
export const generateSecret = () => {

  // 랜덤으로 형용사와 명사를 조합하여 반환
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};