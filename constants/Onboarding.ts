import {ImageProps} from "react-native";

export const BACKGROUND_COLOR = '#F1F1F1';

export interface PageInterface extends Pick<ImageProps, 'source'> {
  title: string;
  description: string;
}

export const PAGES: PageInterface[] = [
  {
    title: 'حفص عن عاصم',
    description: " رواية حَفْص عن عاصِمِ بن أبي النَّجُود الكُوفيّ: وهي الرواية التي يقرأ بها أهل آسيا عموماً وبعض طلبة العلم",
    source: require('../assets/images/1.heic'),
  },
  {
    title: 'قالون عن نافع',
    description:
      " رواية قالون عن نَافِعٍ المَدَنيّ: وهي الرواية التي يقرأ بها أهل ليبيا وتونس وبعض المناطق في موريتانيا.",
    source: require('../assets/images/2.heic'),
  },
  {
    title: 'الدوري عن أبي عمرو',
    description:
      ' رواية الدُّورِيّ عن أبي عَمْرِو البَصْريّ: عن أبي عَمْرِو البَصْريّ وهي الرواية التي يقرأ بها أهل السودان وشرق أفريقيا.',
    source: require('../assets/images/3.heic'),
  },
];