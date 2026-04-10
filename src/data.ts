export const WILAYAS = [
  "أدرار","الشلف","الأغواط","أم البواقي","باتنة","بجاية","بسكرة","بشار","البليدة","البويرة",
  "تمنراست","تبسة","تلمسان","تيارت","تيزي وزو","الجزائر","الجلفة","جيجل","سطيف","سعيدة",
  "سكيكدة","سيدي بلعباس","عنابة","قالمة","قسنطينة","المدية","مستغانم","المسيلة","معسكر","ورقلة",
  "وهران","البيض","إليزي","برج بوعريريج","بومرداس","الطارف","تندوف","تيسمسيلت","الوادي","خنشلة",
  "سوق أهراس","تيبازة","ميلة","عين الدفلى","النعامة","عين تموشنت","غرداية","غليزان","تيميمون","برج باجي مختار",
  "أولاد جلال","بني عباس","عين صالح","عين قزام","تقرت","جانت","المغير","المنيعة"
];

export const COMMUNES_MAP: Record<number, string[]> = {
  0: ["أدرار","تيمياوين","أولف","بودة","تامست"],
  1: ["الشلف","أم الدروع","بني حواء","تغليمت","العطاف"],
  2: ["الأغواط","آفلو","برج خليل","سبقاق","قصر الحيران"],
  3: ["أم البواقي","عين البيضاء","سيقوس","عين مليلة","بلال"],
  4: ["باتنة","آريس","بريكة","مروانة","نقاوس"],
  5: ["بجاية","تيشي","أقبو","سيدي عيش","خراطة"],
  6: ["بسكرة","طولقة","سيدي عقبة","أورلال","زريبة الوادي"],
  7: ["بشار","عين الصفراء","كنادسة","تاغيت","أبادلة"],
  8: ["البليدة","الأربعاء","بوفاريك","شريعة","موزاية"],
  9: ["البويرة","بويرة","عين بسام","سور الغزلان","أقبو"],
};

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

export interface Donor {
  name: string;
  blood: string;
  type: 'blood' | 'both';
  wilaya: string;
  commune: string;
  phone: string;
  lastDon: Date;
}

export const MOCK_DONORS: Donor[] = [
  { name:"أحمد بوعلام", blood:"O+", type:"both", wilaya:"الجزائر", commune:"برج البحري", phone:"0550123456", lastDon: daysAgo(120) },
  { name:"فاطمة زهراء", blood:"A+", type:"blood", wilaya:"وهران", commune:"سيدي الشحمي", phone:"0661234567", lastDon: daysAgo(45) },
  { name:"محمد العربي", blood:"B-", type:"blood", wilaya:"قسنطينة", commune:"ابن زياد", phone:"0770987654", lastDon: daysAgo(200) },
  { name:"نور الدين", blood:"O-", type:"both", wilaya:"تلمسان", commune:"تلمسان", phone:"0555321654", lastDon: daysAgo(95) },
  { name:"سارة بن علي", blood:"AB+", type:"blood", wilaya:"باتنة", commune:"باتنة", phone:"0660111222", lastDon: daysAgo(30) },
  { name:"يوسف بلحاج", blood:"A-", type:"both", wilaya:"بجاية", commune:"بجاية", phone:"0771445566", lastDon: daysAgo(100) },
  { name:"أمينة حمداني", blood:"B+", type:"blood", wilaya:"الجزائر", commune:"باب الزوار", phone:"0550778899", lastDon: daysAgo(15) },
  { name:"خالد مسعود", blood:"O+", type:"both", wilaya:"وهران", commune:"وهران", phone:"0662334455", lastDon: daysAgo(150) },
  { name:"إيمان بنسعد", blood:"AB-", type:"blood", wilaya:"سطيف", commune:"سطيف", phone:"0553667788", lastDon: daysAgo(60) },
  { name:"عمر بلقاسم", blood:"A+", type:"both", wilaya:"تلمسان", commune:"وجدة", phone:"0772990011", lastDon: daysAgo(200) },
  { name:"حسيبة عيسى", blood:"O-", type:"blood", wilaya:"باتنة", commune:"مروانة", phone:"0551223344", lastDon: daysAgo(80) },
  { name:"رضا قاسمي", blood:"B+", type:"both", wilaya:"قسنطينة", commune:"قسنطينة", phone:"0663445566", lastDon: daysAgo(130) },
];

export function isAvailable(lastDon: Date): boolean {
  if (!lastDon) return true;
  const diff = (new Date().getTime() - new Date(lastDon).getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 90;
}

export function nextDate(lastDon: Date): string {
  const d = new Date(lastDon);
  d.setDate(d.getDate() + 90);
  return d.toLocaleDateString('ar-DZ');
}

export const BLOOD_TYPES = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
