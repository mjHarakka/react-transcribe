# Dev Journal

## 29.4

Kireä aikataulu, aloitin työstämään proggista. Init oli tehty aiemmin. Loin Claudella alustavan kaavion vaadittavasta tech stackista ja lähdin tämän pohjalta rakentamaan tätä.

Aluksi yksinkertainen toimiva versio sovelluksesta jossa pystyy vain lisäämään muistiinpanoja tekstimuodossa, tämän jälkeen poistamismahdollisuus.

Seuraavaksi pitäisi saada CRUD toimimaan, tässä tapauksessa vain CRD ilman päivitysominaisuutta koska äänitiedostoja ei pahemmin voi päivittää. Lähdin pläänäilemään `react-av`:ta mitä Claude suositteli äänitiedostojen tallentamiseen.

- Kehitysympäristö on WSL:ssä (Windows 11)
- Pyöritän Android-emulaattoria Android Studion kautta oman puhelimen sijasta
- `npx expo start` komentoon `--tunnel` flag pakollinen, ei muuten pelitä
- Suhteellisen vähän ongelmia

---

## 30.4

- Refactor TypeScriptiin — projektin piti aluksi olla TypeScriptillä mutta unohtui alkuun
- `npm install --save-dev typescript @types/react @types/react-native`
- `tsconfig.json`:n luominen
- Unohdin tehdä uuden branchin TypeScript-refactoria varten, meni sqlite-branchiin
- Uusi branch: `git switch -c refactor/codebase-structure`
- Nyt kun TypeScript kunnossa, refaktoroin sovelluksen rakennetta rakeisemmaksi ja decoupleen toiminnallisuutta muihin tiedostoihin
  - Notesista oma komponentti, SQLite-toiminnallisuus toiseen tiedostoon
- Uusi branch: `expo-av`
- Toiminnallisuus äänen tallentamiseen
  - Ääni tallentuu SQLiteen — tai lähinnä linkki äänitiedostoon
  - Ei kannata tallentaa ääntä suoraan tietokantaan, vain viittaus tiedoston sijaintiin
  - Jouduin asentamaan `expo-file-system`
  - Äänitiedostojen toisto toimii, tallentaa tällä hetkellä ajan ja päivän nimenä
- Tyyliä hieman loogisemmaksi

---

## 1.5

- Uudet viewit `screen`-kansioon omina moduuleinaan
  - Erikseen kotisivulle oma view ja yksittäiselle äänitiedostolle (note)
- Isoin toiminnallisuus: lisätty tietokantataulut `transcription` ja `summary`
  - Pointti on että tekoäly kuuntelee audiotiedoston ja promptilla saadaan lyhyt summary ja koko litterointi

---

## 2.5

- Hieman hakuammuntaa — tehdään pienin mahdollinen toiminnallisuus jolla voidaan testata Whisperin rajapintaa
- `services`-kansioon `transcribe.ts` joka hoitaa rajapintakutsut `https://api.openai.com/v1/audio/transcriptions`
- Testasin API-avaimella, tuli aluksi:
  ```
  {"error":{"message":"You exceeded your current quota...","type":"insufficient_quota"}}
  ```
- Latasin 5 dollaria OpenAI:lle, lähti pelittämään — virheviestistä selvä että ei ollut varoja
- Ei mitään ihmeempiä propellihatturatkaisuja: POST:lla audiotiedosto OpenAI:n Whisperiin, Whisper palauttaa audion tekstinä
- Uusi POST rajapintaan jossa pyydetään tekemään tiivistelmä tästä tekstistä

---

## 3.5

- Branch: `polish/ui-improvements`
- Ajanotto tallennukseen
- Varmistus poistamisen yhteydessä
- Teksti tyhjälle sivulle (ei tallenteita)
