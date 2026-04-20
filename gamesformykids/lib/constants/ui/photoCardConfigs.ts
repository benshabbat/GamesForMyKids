/**
 * ===============================================
 * Photo / Logo Card Configurations
 * ===============================================
 * ׳׳¨׳›׳– ׳׳× ׳›׳ ׳”׳ ׳×׳•׳ ׳™׳ (URL maps + ׳¡׳˜׳™׳™׳׳™׳ ׳’) ׳¢׳‘׳•׳¨ ׳›׳
 * ׳”׳›׳¨׳˜׳™׳¡׳™׳ ׳©׳׳¦׳™׳’׳™׳ ׳×׳׳•׳ ׳”/׳׳•׳’׳• ׳-Wikimedia / ׳׳§׳•׳¨ ׳—׳™׳¦׳•׳ ׳™.
 * ׳”׳§׳•׳׳₪׳•׳ ׳ ׳˜ ׳”׳’׳ ׳¨׳™ PhotoGameCard ׳¦׳•׳¨׳ ׳׳× ׳”׳§׳•׳ ׳₪׳™׳’ ׳”׳–׳”.
 */

export interface PhotoCardConfig {
  /** ׳׳™׳₪׳•׳™ ׳©׳ ׳₪׳¨׳™׳˜ -> URL ׳×׳׳•׳ ׳” */
  imageUrls: Record<string, string>;
  /** object-fit: cover ׳׳×׳׳•׳ ׳•׳×, contain ׳׳׳•׳’׳•׳׳™׳ */
  objectFit: "cover" | "contain";
  /** ׳¨׳§׳¢ ׳‘׳¨׳™׳¨׳× ׳׳—׳“׳ ׳©׳ ׳”׳›׳¨׳˜׳™׳¡ */
  cardBg: string;
  /** ׳¨׳§׳¢ ׳׳₪׳™ ׳₪׳¨׳™׳˜ (׳׳•׳₪׳¦׳™׳•׳ ׳׳™, ׳›׳׳• NBA / Tech) */
  cardBgMap?: Record<string, string>;
  /** ׳׳—׳׳§׳•׳× ׳’׳‘׳•׳ ׳›׳©׳ ׳‘׳—׳¨ */
  selectedBorder: string;
  /** ׳׳—׳׳§׳•׳× ׳’׳‘׳•׳ ׳¨׳’׳™׳ */
  defaultBorder: string;
  /** ׳¨׳§׳¢ ׳©׳•׳¨׳× ׳”׳×׳•׳•׳™׳× */
  labelBg: string;
  /** ׳¦׳‘׳¢ ׳˜׳§׳¡׳˜ ׳”׳×׳•׳•׳™׳× */
  labelText: string;
  /** padding ׳‘׳×׳•׳ ׳׳–׳•׳¨ ׳”׳×׳׳•׳ ׳” (׳׳•׳’׳•׳׳™׳ ׳‘׳׳‘׳“) */
  imagePadding?: string;
}

// ג”€ג”€ג”€ Butterflies ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€

const BUTTERFLIES_URLS: Record<string, string> = {
  "monarch":        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Monarch_Butterfly_Danaus_plexippus_Male_2664px.jpg/330px-Monarch_Butterfly_Danaus_plexippus_Male_2664px.jpg",
  "swallowtail":    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Pristine_Eastern_Tiger_Swallowtail.jpg/330px-Pristine_Eastern_Tiger_Swallowtail.jpg",
  "blue-morpho":    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Morpho_didius_Male_Dos_MHNT.jpg/330px-Morpho_didius_Male_Dos_MHNT.jpg",
  "painted-lady":   "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/0_Belle-dame_%28Vanessa_cardui%29_-_Echinacea_purpurea_-_Havr%C3%A9_%283%29.jpg/330px-0_Belle-dame_%28Vanessa_cardui%29_-_Echinacea_purpurea_-_Havr%C3%A9_%283%29.jpg",
  "red-admiral":    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Red_admiral_%28Vanessa_atalanta%29_Hungary.jpg/330px-Red_admiral_%28Vanessa_atalanta%29_Hungary.jpg",
  "cabbage-white":  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Pieris.rapae.mounted.jpg/330px-Pieris.rapae.mounted.jpg",
  "birdwing":       "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Birdwing_representatives.jpg/330px-Birdwing_representatives.jpg",
  "glasswing":      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Greta_oto.jpg/330px-Greta_oto.jpg",
  "luna-moth":      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Actias_luna-male.jpg/330px-Actias_luna-male.jpg",
  "zebra-longwing": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Heliconius_charithonia_2021.jpg/330px-Heliconius_charithonia_2021.jpg",
  "atlas-moth":     "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Attacus_atlas_qtl3.jpg/330px-Attacus_atlas_qtl3.jpg",
  "apollo":         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Parnassius_apollo_Pirineus.JPG/330px-Parnassius_apollo_Pirineus.JPG",
};

// ג”€ג”€ג”€ Exotic Birds ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€

const EXOTIC_BIRDS_URLS: Record<string, string> = {
  "flamingo":    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/American_Flamingo_JG.jpg/330px-American_Flamingo_JG.jpg",
  "toucan":      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Keel-billed_toucan_%28Ramphastos_sulfuratus_sulfuratus%29_on_foxtail_palm_%28Wodyetia_bifurcata%29_Cayo.jpg/330px-Keel-billed_toucan_%28Ramphastos_sulfuratus_sulfuratus%29_on_foxtail_palm_%28Wodyetia_bifurcata%29_Cayo.jpg",
  "peacock":     "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Peacock_on_tree_%2852077240794%29.jpg/330px-Peacock_on_tree_%2852077240794%29.jpg",
  "macaw":       "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Blue-and-Yellow-Macaw.jpg/330px-Blue-and-Yellow-Macaw.jpg",
  "owl":         "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/SnowyOwlAmericanBlackDuck.jpg/330px-SnowyOwlAmericanBlackDuck.jpg",
  "eagle":       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Bald_eagle_about_to_fly_in_Alaska_%282016%29.jpg/330px-Bald_eagle_about_to_fly_in_Alaska_%282016%29.jpg",
  "penguin":     "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/South_Shetland-2016-Deception_Island%E2%80%93Chinstrap_penguin_%28Pygoscelis_antarctica%29_04.jpg/250px-South_Shetland-2016-Deception_Island%E2%80%93Chinstrap_penguin_%28Pygoscelis_antarctica%29_04.jpg",
  "parrot":      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Rainbow_lorikeet_%28Trichoglossus_moluccanus_moluccanus%29_Sydney.jpg/330px-Rainbow_lorikeet_%28Trichoglossus_moluccanus_moluccanus%29_Sydney.jpg",
  "hummingbird": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Trinidad_and_Tobago_hummingbirds_composite.jpg/330px-Trinidad_and_Tobago_hummingbirds_composite.jpg",
  "pelican":     "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/American_White_Pelican.jpg/330px-American_White_Pelican.jpg",
  "swan":        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/CygneVaires.jpg/330px-CygneVaires.jpg",
  "puffin":      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Puffin_%28Fratercula_arctica%29.jpg/330px-Puffin_%28Fratercula_arctica%29.jpg",
};

// ג”€ג”€ג”€ Cat Breeds ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€

const CAT_BREEDS_URLS: Record<string, string> = {
  "persian":          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Persialainen.jpg/330px-Persialainen.jpg",
  "siamese":          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Siam_lilacpoint.jpg/250px-Siam_lilacpoint.jpg",
  "maine-coon":       "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/M%C3%A2le_Black_Silver_Blotched_Tabby.jpeg/330px-M%C3%A2le_Black_Silver_Blotched_Tabby.jpeg",
  "bengal":           "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Paintedcats_Red_Star_standing.jpg/250px-Paintedcats_Red_Star_standing.jpg",
  "ragdoll":          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Ragdoll_from_Gatil_Ragbelas.jpg/330px-Ragdoll_from_Gatil_Ragbelas.jpg",
  "british-short":    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Britishblue.jpg/250px-Britishblue.jpg",
  "scottish-fold":    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Scottish_Fold_-_CFF_cat_show_Heinola_2008-05-03_IMG_7882.JPG/330px-Scottish_Fold_-_CFF_cat_show_Heinola_2008-05-03_IMG_7882.JPG",
  "sphynx":           "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Sphynx_-_cat._img_031.jpg/330px-Sphynx_-_cat._img_031.jpg",
  "abyssinian":       "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Gustav_chocolate.jpg/250px-Gustav_chocolate.jpg",
  "russian-blue":     "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Russian_blue_kitten_%28cropped%29.jpg/330px-Russian_blue_kitten_%28cropped%29.jpg",
  "norwegian-forest": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Dalaja-Doll-norv%C3%A9gien-ambre-blotched-tabby_avec-blanc_2008_%28cropped%29.jpg/330px-Dalaja-Doll-norv%C3%A9gien-ambre-blotched-tabby_avec-blanc_2008_%28cropped%29.jpg",
  "burmese":          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/British_burmese_-_Andel_Alois_at_Cat_show.JPG/330px-British_burmese_-_Andel_Alois_at_Cat_show.JPG",
};

// ג”€ג”€ג”€ Dog Breeds ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€

const DOG_BREEDS_URLS: Record<string, string> = {
  "golden-retriever": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Golden_Retriever_Dukedestiny01_drvd.jpg/250px-Golden_Retriever_Dukedestiny01_drvd.jpg",
  "german-shepherd":  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Collage_of_Nine_Dogs.jpg/250px-Collage_of_Nine_Dogs.jpg",
  "labrador":         "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Labrador_on_Quantock_%282175262184%29.jpg/330px-Labrador_on_Quantock_%282175262184%29.jpg",
  "bulldog":          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Bulldog_inglese.jpg/330px-Bulldog_inglese.jpg",
  "poodle":           "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Full_attention_%288067543690%29.jpg/330px-Full_attention_%288067543690%29.jpg",
  "beagle":           "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Beagle_600.jpg/330px-Beagle_600.jpg",
  "chihuahua":        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Chihuahua1_bvdb.jpg/330px-Chihuahua1_bvdb.jpg",
  "husky":            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Husky_L.jpg/330px-Husky_L.jpg",
  "dachshund":        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/%EB%8B%A5%EC%8A%A4%ED%9B%88%ED%8A%B8%28%EB%8B%A8%EB%AA%A8%EC%A2%85%29_%28Dachshund_%28Short%29%29.jpg/330px-%EB%8B%A5%EC%8A%A4%ED%9B%88%ED%8A%B8%28%EB%8B%A8%EB%AA%A8%EC%A2%85%29_%28Dachshund_%28Short%29%29.jpg",
  "dalmatian":        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Sun_Dog_Dalmatian.jpg/330px-Sun_Dog_Dalmatian.jpg",
  "rottweiler":       "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Rottweiler_standing_facing_left.jpg/330px-Rottweiler_standing_facing_left.jpg",
  "pomeranian":       "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Pomeranian.JPG/330px-Pomeranian.JPG",
  "shih-tzu":         "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Shihtzu_%28cropped%29.jpg/330px-Shihtzu_%28cropped%29.jpg",
  "border-collie":    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Border_Collie_600.jpg/330px-Border_Collie_600.jpg",
  "maltese":          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Maltese_600.jpg/330px-Maltese_600.jpg",
};

// ג”€ג”€ג”€ World Landmarks ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€

const WORLD_LANDMARKS_URLS: Record<string, string> = {
  "eiffel-tower":      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/330px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
  "big-ben":           "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Elizabeth_Tower%2C_June_2022.jpg/330px-Elizabeth_Tower%2C_June_2022.jpg",
  "statue-of-liberty": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Front_view_of_Statue_of_Liberty_%28cropped%29.jpg/330px-Front_view_of_Statue_of_Liberty_%28cropped%29.jpg",
  "colosseum":         "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/250px-Colosseo_2020.jpg",
  "taj-mahal":         "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/330px-Taj_Mahal_%28Edited%29.jpeg",
  "great-wall":        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/250px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
  "pyramids":          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/250px-Kheops-Pyramid.jpg",
  "sydney-opera":      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Sydney_Australia._%2821339175489%29.jpg/250px-Sydney_Australia._%2821339175489%29.jpg",
  "burj-khalifa":      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Burj_Khalifa_%28worlds_tallest_building%29_and_the_Dubai_skyline_%2825781049892%29.jpg/330px-Burj_Khalifa_%28worlds_tallest_building%29_and_the_Dubai_skyline_%2825781049892%29.jpg",
  "sagrada-familia":   "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/%CE%A3%CE%B1%CE%B3%CF%81%CE%AC%CE%B4%CE%B1_%CE%A6%CE%B1%CE%BC%CE%AF%CE%BB%CE%B9%CE%B1_2941.jpg/330px-%CE%A3%CE%B1%CE%B3%CF%81%CE%AC%CE%B4%CE%B1_%CE%A6%CE%B1%CE%BC%CE%AF%CE%BB%CE%B9%CE%B1_2941.jpg",
  "acropolis":         "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/1029_Acropolis_of_Athens_in_Greece_at_night_Photo_by_Giles_Laurent.jpg/330px-1029_Acropolis_of_Athens_in_Greece_at_night_Photo_by_Giles_Laurent.jpg",
  "petra":             "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Al_Deir_Petra.JPG/330px-Al_Deir_Petra.JPG",
  "niagara-falls":     "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/3Falls_Niagara.jpg/330px-3Falls_Niagara.jpg",
  "mount-fuji":        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/080103_hakkai_fuji.jpg/250px-080103_hakkai_fuji.jpg",
  "stonehenge":        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Stonehenge2007_07_30.jpg/250px-Stonehenge2007_07_30.jpg",
  "christ-redeemer":   "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Christ_the_Redeemer_-_Cristo_Redentor.jpg/330px-Christ_the_Redeemer_-_Cristo_Redentor.jpg",
  "machu-picchu":      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Machu_Picchu%2C_2023_%28012%29.jpg/330px-Machu_Picchu%2C_2023_%28012%29.jpg",
  "tower-of-london":   "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Tower_of_London_from_the_Shard_%288515883950%29.jpg/330px-Tower_of_London_from_the_Shard_%288515883950%29.jpg",
  "angkor-wat":        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Buddhist_monks_in_front_of_the_Angkor_Wat.jpg/330px-Buddhist_monks_in_front_of_the_Angkor_Wat.jpg",
  "golden-gate":       "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/250px-GoldenGateBridge-001.jpg",
};

// ג”€ג”€ג”€ Famous Paintings ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€

const FAMOUS_PAINTINGS_URLS: Record<string, string> = {
  "mona-lisa":          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/330px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
  "starry-night":       "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/330px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
  "the-scream":         "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/330px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg",
  "girl-pearl-earring": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/250px-1665_Girl_with_a_Pearl_Earring.jpg",
  "birth-of-venus":     "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/330px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
  "creation-of-adam":   "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/330px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg",
  "water-lilies":       "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/250px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg",
  "sunflowers":         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_Willem_van_Gogh_127.jpg/330px-Vincent_Willem_van_Gogh_127.jpg",
  "last-supper":        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg/330px-The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg",
  "american-gothic":    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg/330px-Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg",
  "night-watch":        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/La_ronda_de_noche%2C_por_Rembrandt_van_Rijn.jpg/330px-La_ronda_de_noche%2C_por_Rembrandt_van_Rijn.jpg",
  "the-kiss":           "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/330px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
  "las-meninas":        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg/330px-Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg",
  "hay-wain":           "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/John_Constable_-_The_Hay_Wain_%281821%29.jpg/330px-John_Constable_-_The_Hay_Wain_%281821%29.jpg",
  "whistlers-mother":   "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Whistlers_Mother_high_res.jpg/330px-Whistlers_Mother_high_res.jpg",
};

// ג”€ג”€ג”€ Solar System ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€

const SOLAR_SYSTEM_URLS: Record<string, string> = {
  "sun":     "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/330px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg",
  "mercury": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/330px-Mercury_in_true_color.jpg",
  "venus":   "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Venus_2_Approach_Image.jpg/330px-Venus_2_Approach_Image.jpg",
  "earth":   "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/330px-The_Earth_seen_from_Apollo_17.jpg",
  "mars":    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/330px-OSIRIS_Mars_true_color.jpg",
  "jupiter": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Jupiter_OPAL_2024.png/330px-Jupiter_OPAL_2024.png",
  "saturn":  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/330px-Saturn_during_Equinox.jpg",
  "uranus":  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Uranus_Voyager2_color_calibrated.png/330px-Uranus_Voyager2_color_calibrated.png",
  "neptune": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_Full.jpg/330px-Neptune_Full.jpg",
  "moon":    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/330px-FullMoon2010.jpg",
  "pluto":   "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Pluto_in_True_Color_-_High-Res.png/330px-Pluto_in_True_Color_-_High-Res.png",
  "comet":   "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Comet_Hale-Bopp_1995O1.jpg/330px-Comet_Hale-Bopp_1995O1.jpg",
};

// ג”€ג”€ג”€ NBA Teams ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€

const NBA_TEAMS_URLS: Record<string, string> = {
  "lakers":   "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/250px-Los_Angeles_Lakers_logo.svg.png",
  "bulls":    "https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Chicago_Bulls_logo.svg/250px-Chicago_Bulls_logo.svg.png",
  "warriors": "https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Golden_State_Warriors_logo.svg/250px-Golden_State_Warriors_logo.svg.png",
  "celtics":  "https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Boston_Celtics.svg/250px-Boston_Celtics.svg.png",
  "heat":     "https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Miami_Heat_logo.svg/250px-Miami_Heat_logo.svg.png",
  "nets":     "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Brooklyn_Nets_newlogo.svg/250px-Brooklyn_Nets_newlogo.svg.png",
  "knicks":   "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/New_York_Knicks_logo.svg/250px-New_York_Knicks_logo.svg.png",
  "spurs":    "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/San_Antonio_Spurs.svg/250px-San_Antonio_Spurs.svg.png",
  "mavs":     "https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Dallas_Mavericks_logo.svg/250px-Dallas_Mavericks_logo.svg.png",
  "clippers": "https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Los_Angeles_Clippers_%282015%29.svg/250px-Los_Angeles_Clippers_%282015%29.svg.png",
  "suns":     "https://upload.wikimedia.org/wikipedia/en/thumb/d/dc/Phoenix_Suns_logo.svg/250px-Phoenix_Suns_logo.svg.png",
  "bucks":    "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Milwaukee_Bucks_logo.svg/250px-Milwaukee_Bucks_logo.svg.png",
};

const NBA_BG_MAP: Record<string, string> = {
  "lakers":   "bg-yellow-900",
  "bulls":    "bg-gray-900",
  "warriors": "bg-blue-900",
  "celtics":  "bg-green-900",
  "heat":     "bg-gray-900",
  "nets":     "bg-black",
  "knicks":   "bg-blue-900",
  "spurs":    "bg-gray-800",
  "mavs":     "bg-blue-900",
  "clippers": "bg-blue-800",
  "suns":     "bg-orange-900",
  "bucks":    "bg-green-900",
};

// ג”€ג”€ג”€ Tech Logos ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€

const TECH_LOGOS_URLS: Record<string, string> = {
  "google":    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/250px-Google_2015_logo.svg.png",
  "apple":     "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/120px-Apple_logo_black.svg.png",
  "microsoft": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/250px-Microsoft_logo.svg.png",
  "amazon":    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/250px-Amazon_logo.svg.png",
  "meta":      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/250px-Meta_Platforms_Inc._logo.svg.png",
  "netflix":   "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/250px-Netflix_2015_logo.svg.png",
  "spotify":   "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/250px-Spotify_logo_with_text.svg.png",
  "youtube":   "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/250px-YouTube_full-color_icon_%282017%29.svg.png",
  "tesla":     "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/120px-Tesla_T_symbol.svg.png",
  "samsung":   "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/250px-Samsung_Logo.svg.png",
  "intel":     "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Intel-logo.svg/250px-Intel-logo.svg.png",
  "twitter-x": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/120px-X_logo_2023.svg.png",
  "github":    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/250px-Octicons-mark-github.svg.png",
  "adobe":     "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Horizontal_Lockup_Red_HEX.svg/250px-Adobe_Corporate_Horizontal_Lockup_Red_HEX.svg.png",
  "paypal":    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/250px-PayPal.svg.png",
};

const TECH_BG_MAP: Record<string, string> = {
  "google": "bg-white", "apple": "bg-gray-100", "microsoft": "bg-white",
  "amazon": "bg-white", "meta": "bg-white", "netflix": "bg-black",
  "spotify": "bg-black", "youtube": "bg-white", "tesla": "bg-white",
  "samsung": "bg-white", "intel": "bg-white", "twitter-x": "bg-black",
  "github": "bg-white", "adobe": "bg-white", "paypal": "bg-white",
};

// ג”€ג”€ג”€ Soccer Logos ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€

const SOCCER_LOGOS_URLS: Record<string, string> = {
  "barcelona":         "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
  "real-madrid":       "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
  "manchester-united": "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
  "liverpool":         "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
  "chelsea":           "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
  "arsenal":           "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
  "manchester-city":   "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
  "juventus":          "https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_logo.svg",
  "ac-milan":          "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
  "psg":               "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg",
  "bayern":            "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282002%E2%80%932017%29.svg",
  "dortmund":          "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg",
  "ajax":              "https://upload.wikimedia.org/wikipedia/en/7/79/Ajax_Amsterdam.svg",
  "atletico":          "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg",
  "tottenham":         "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
  "porto":             "https://upload.wikimedia.org/wikipedia/en/3/3b/FC_Porto.svg",
  "benfica":           "https://upload.wikimedia.org/wikipedia/en/c/ce/Sport_Lisboa_e_Benfica_(logo).svg",
  "inter-milan":       "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg",
  "napoli":            "https://upload.wikimedia.org/wikipedia/commons/2/2d/SSC_Napoli_%28crest%29.svg",
  "roma":              "https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg",
  "leicester":         "https://upload.wikimedia.org/wikipedia/en/2/2d/Leicester_City_crest.svg",
  "celtic":            "https://upload.wikimedia.org/wikipedia/en/a/a4/Celtic_FC_crest.svg",
  "rangers":           "https://upload.wikimedia.org/wikipedia/en/f/f2/Rangers_FC.svg",
  "maccabi-haifa":     "https://upload.wikimedia.org/wikipedia/en/5/55/Maccabi_Haifa_FC.svg",
  "hapoel":            "https://upload.wikimedia.org/wikipedia/en/b/bc/Hapoel_Tel_Aviv_FC.svg",
};

// ג”€ג”€ג”€ Car Brands ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€

const CAR_BRANDS_URLS: Record<string, string> = {
  "toyota":       "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg",
  "bmw":          "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
  "mercedes":     "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
  "volkswagen":   "https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg",
  "ford":         "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg",
  "honda":        "https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg",
  "audi":         "https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg",
  "tesla":        "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
  "ferrari":      "https://upload.wikimedia.org/wikipedia/en/d/d1/Ferrari-Logo.svg",
  "nissan":       "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nissan_2020_logo.svg",
  "hyundai":      "https://upload.wikimedia.org/wikipedia/commons/0/07/Hyundai_Motor_Company_logo.svg",
  "kia":          "https://upload.wikimedia.org/wikipedia/commons/1/13/Kia_logo.svg",
  "peugeot":      "https://upload.wikimedia.org/wikipedia/commons/1/17/Logo_PEUGEOT.svg",
  "renault":      "https://upload.wikimedia.org/wikipedia/commons/b/b7/Renault_2021_Text.svg",
  "mazda":        "https://upload.wikimedia.org/wikipedia/commons/8/8d/Mazda_logo.svg",
  "volvo":        "https://upload.wikimedia.org/wikipedia/commons/a/a2/Volvo_logo.svg",
  "lamborghini":  "https://upload.wikimedia.org/wikipedia/commons/0/0d/Lamborghini-Logo.svg",
  "subaru":       "https://upload.wikimedia.org/wikipedia/commons/5/5a/Subaru_logo.svg",
  "porsche":      "https://upload.wikimedia.org/wikipedia/en/1/13/Porsche_logo.svg",
  "jeep":         "https://upload.wikimedia.org/wikipedia/commons/a/a5/Jeep_logo.svg",
};

// ─── Dinosaurs ──────────────────────────────────────────────────────────────────

const DINOSAURS_URLS: Record<string, string> = {
  "triceratops":     "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/LA-Triceratops_mount-2.jpg/330px-LA-Triceratops_mount-2.jpg",
  "tyrannosaurus":   "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Tyrannosaurus_Rex_Holotype.jpg/330px-Tyrannosaurus_Rex_Holotype.jpg",
  "stegosaurus":     "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Journal.pone.0138352.g001A.jpg/330px-Journal.pone.0138352.g001A.jpg",
  "brachiosaurus":   "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Brachiosaurus_mount.jpg/330px-Brachiosaurus_mount.jpg",
  "velociraptor":    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Velociraptor_skeleton_white_background.jpg/330px-Velociraptor_skeleton_white_background.jpg",
  "diplodocus":      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/CM_Diplodocus.jpg/330px-CM_Diplodocus.jpg",
  "pteranodon":      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Pteranodon_amnh_martyniuk.jpg/330px-Pteranodon_amnh_martyniuk.jpg",
  "ankylosaurus":    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Ankylosaur_head_-_cast_-_Custer_County_Montana_-_Museum_of_the_Rockies_-_2013-07-08.jpg/330px-Ankylosaur_head_-_cast_-_Custer_County_Montana_-_Museum_of_the_Rockies_-_2013-07-08.jpg",
  "spinosaurus":     "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/FSAC-KK-11888.jpg/330px-FSAC-KK-11888.jpg",
  "allosaurus":      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/WLA_hmns_Allosaurus_White_Background.jpg/330px-WLA_hmns_Allosaurus_White_Background.jpg",
  "parasaurolophus": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/FMNH_Parasaurolophus_fossil.jpg/330px-FMNH_Parasaurolophus_fossil.jpg",
  "compsognathus":   "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Compy.jpg/330px-Compy.jpg",
};

// ג”€ג”€ג”€ Main export: config per game type ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€ג”€

export const PHOTO_CARD_CONFIGS = {
  "butterflies": {
    imageUrls: BUTTERFLIES_URLS, objectFit: "cover",
    cardBg: "bg-pink-50", selectedBorder: "border-pink-400 ring-4 ring-pink-400 ring-offset-4",
    defaultBorder: "border-pink-200", labelBg: "bg-pink-50", labelText: "text-pink-900",
  },
  "exotic-birds": {
    imageUrls: EXOTIC_BIRDS_URLS, objectFit: "cover",
    cardBg: "bg-sky-50", selectedBorder: "border-sky-400 ring-4 ring-sky-400 ring-offset-4",
    defaultBorder: "border-sky-200", labelBg: "bg-sky-50", labelText: "text-sky-900",
  },
  "cat-breeds": {
    imageUrls: CAT_BREEDS_URLS, objectFit: "cover",
    cardBg: "bg-purple-50", selectedBorder: "border-purple-400 ring-4 ring-purple-400 ring-offset-4",
    defaultBorder: "border-purple-200", labelBg: "bg-purple-50", labelText: "text-purple-900",
  },
  "dog-breeds": {
    imageUrls: DOG_BREEDS_URLS, objectFit: "cover",
    cardBg: "bg-amber-50", selectedBorder: "border-amber-500 ring-4 ring-amber-500 ring-offset-4",
    defaultBorder: "border-amber-200", labelBg: "bg-amber-50", labelText: "text-amber-900",
  },
  "world-landmarks": {
    imageUrls: WORLD_LANDMARKS_URLS, objectFit: "cover",
    cardBg: "bg-white", selectedBorder: "border-green-400 ring-4 ring-green-400 ring-offset-4",
    defaultBorder: "border-white", labelBg: "bg-white", labelText: "text-gray-800",
  },
  "famous-paintings": {
    imageUrls: FAMOUS_PAINTINGS_URLS, objectFit: "cover",
    cardBg: "bg-stone-100", selectedBorder: "border-amber-400 ring-4 ring-amber-400 ring-offset-4",
    defaultBorder: "border-amber-200", labelBg: "bg-stone-100", labelText: "text-stone-800",
  },
  "solar-system": {
    imageUrls: SOLAR_SYSTEM_URLS, objectFit: "cover",
    cardBg: "bg-gray-900", selectedBorder: "border-yellow-400 ring-4 ring-yellow-400 ring-offset-4",
    defaultBorder: "border-gray-800", labelBg: "bg-gray-900", labelText: "text-yellow-200",
  },
  "nba-teams": {
    imageUrls: NBA_TEAMS_URLS, objectFit: "contain",
    cardBg: "bg-gray-900", cardBgMap: NBA_BG_MAP,
    selectedBorder: "border-orange-400 ring-4 ring-orange-400 ring-offset-4",
    defaultBorder: "border-gray-700", labelBg: "bg-black/60", labelText: "text-orange-200",
    imagePadding: "p-3",
  },
  "tech-logos": {
    imageUrls: TECH_LOGOS_URLS, objectFit: "contain",
    cardBg: "bg-white", cardBgMap: TECH_BG_MAP,
    selectedBorder: "border-blue-400 ring-4 ring-blue-400 ring-offset-4",
    defaultBorder: "border-gray-200", labelBg: "bg-gray-50", labelText: "text-gray-800",
    imagePadding: "p-4",
  },
  "soccer-logos": {
    imageUrls: SOCCER_LOGOS_URLS, objectFit: "contain",
    cardBg: "bg-white", selectedBorder: "border-green-400 ring-4 ring-green-400 ring-offset-4",
    defaultBorder: "border-white", labelBg: "bg-white", labelText: "text-gray-800",
    imagePadding: "p-1",
  },
  "car-brands": {
    imageUrls: CAR_BRANDS_URLS, objectFit: "contain",
    cardBg: "bg-white", selectedBorder: "border-green-400 ring-4 ring-green-400 ring-offset-4",
    defaultBorder: "border-white", labelBg: "bg-white", labelText: "text-gray-800",
    imagePadding: "p-2",
  },
  "dinosaurs": {
    imageUrls: DINOSAURS_URLS, objectFit: "cover",
    cardBg: "bg-stone-100", selectedBorder: "border-emerald-500 ring-4 ring-emerald-500 ring-offset-4",
    defaultBorder: "border-stone-300", labelBg: "bg-stone-100", labelText: "text-stone-800",
  },
} as const satisfies Record<string, PhotoCardConfig>;

export type PhotoCardGameType = keyof typeof PHOTO_CARD_CONFIGS;
