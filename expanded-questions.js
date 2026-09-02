// ---------------------------------------------------------------------------
// expanded test questions. this is the only file you edit to change the test.
//
//   w = weight  (how much checking it costs you)
//   c = category (drives the bars on the result page)
//   q = the question text
//   t = the hint shown on hover
//
// weights, pick the nearest (any number works, not just these):
//   0.4  trivial   held hands, a dating app, something that happened to you
//   0.8  mild      kissing, masturbated, a cigarette, most kink
//   1.5  notable   oral, intercourse, been drunk, weed, shoplifting
//   2.5  heavy     group sex, arrested, cocaine, cheating, the extreme kink
//   4    extreme   needles, opioids, arson, animal contact, breaking a limit
//   5    criminal  deepfakes, revenge porn, covert filming, armed threats
//   6    felonious rape, grooming, incest with a parent, a corpse
//
// five rules that keep the ladder honest:
//   1. harm to someone else is what pushes a weight up. an act that hurts
//      nobody stays low no matter how unusual it sounds.
//   2. things you chose beat things that happened to you. being robbed, being
//      outed, catching an STI, having your nudes leaked: all near the floor.
//   3. doing beats watching. an act always outweighs footage of that act.
//   4. consensual kink caps at 2.5, however extreme. the only 4 in that
//      category is breaking a negotiated limit, because that is the one
//      entry there with a victim.
//   5. umbrella first, specifics as top-ups. "contact with a family member"
//      carries the 4; "with a sibling" adds 1.5 on top. otherwise one
//      relationship gets billed three times over.
//
// hints are hints, not restatements. the reader already read the question:
// the hint draws the boundary or names the thing, in a handful of words.
//
// to add a question: copy a line, change the four fields.
// to remove one: delete the line. numbering is CSS counters, nothing to renumber.
// to add a category: just use a new c value. its bar appears on its own,
//   in the order it first shows up below.
// each category is sorted lightest first, which is also the order it renders.
// the two umbrella clusters are the exception: they stay together so the
// top-up maths is readable.
// nothing is sent anywhere, so none of this leaves the browser either way.
// ---------------------------------------------------------------------------

const QUESTIONS = [

    // ---------- affection ----------
    { w: 0.4, c: 'affection', q: 'Held hands with romantic intent?', t: 'Interlocked, not a handshake.' },
    { w: 0.4, c: 'affection', q: 'Been on a date?', t: 'However badly it went.' },
    { w: 0.4, c: 'affection', q: 'Asked someone out, or been asked out?', t: 'A no still counts.' },
    { w: 0.4, c: 'affection', q: 'Been in a relationship?', t: 'Both of you agreed. However briefly.' },
    { w: 0.4, c: 'affection', q: 'Said "I love you" to a partner and meant it?', t: 'Romantically. Family does not count.' },
    { w: 0.8, c: 'affection', q: 'Kissed someone on the lips?', t: 'Closed mouth still counts.' },
    { w: 0.8, c: 'affection', q: 'Kissed with tongue?', t: 'Not a peck.' },
    { w: 0.8, c: 'affection', q: 'Given or received a hickey?', t: 'Still there the next day.' },
    { w: 0.8, c: 'affection', q: 'Shared a bed with someone overnight?', t: 'Actually slept. Nothing else required.' },
    { w: 0.8, c: 'affection', q: 'Had a relationship end over sex?', t: 'Wanting it, refusing it, or someone else getting it.' },

    // ---------- solo ----------
    { w: 0.4, c: 'solo', q: 'Fantasised sexually about someone you actually know?', t: 'A friend, a classmate, a coworker.' },
    { w: 0.8, c: 'solo', q: 'Masturbated?', t: 'Finished or not.' },
    { w: 0.8, c: 'solo', q: 'Watched porn?', t: 'On purpose.' },
    { w: 0.8, c: 'solo', q: 'Fantasised sexually about an animal?', t: 'Still only a thought.' },
    { w: 0.8, c: 'solo', q: 'Used a sex toy on yourself?', t: 'Bought for the job, or improvised.' },
    { w: 0.8, c: 'solo', q: 'Written explicit fiction or made explicit art?', t: 'Even if nobody saw it.' },
    { w: 0.8, c: 'solo', q: 'Paid for porn or subscribed to an adult creator?', t: 'Once, or monthly.' },
    { w: 0.8, c: 'solo', q: 'Owned more than three sex toys at once?', t: 'A collection.' },
    { w: 0.8, c: 'solo', q: 'Orgasmed from something other than direct genital contact?', t: 'Nipples, prostate, a dream.' },
    { w: 1.5, c: 'solo', q: 'Watched porn most days for a month or longer?', t: 'A habit, not a look.' },
    { w: 1.5, c: 'solo', q: 'Masturbated while on a call with someone?', t: 'They were there for it.' },
    { w: 1.5, c: 'solo', q: 'Masturbated somewhere you could have been caught?', t: 'Shared room, work bathroom, car.' },
    { w: 2.5, c: 'solo', q: 'Masturbated in a public or semi-public place?', t: 'A park, a changing room.' },

    // ---------- partnered ----------
    { w: 0.4, c: 'partnered', q: "Had sexual contact with someone who isn't your preferred gender?", t: 'Curiosity, or the wrong night.' },
    { w: 0.8, c: 'partnered', q: 'Given manual stimulation to a partner?', t: 'Your hand, their genitals.' },
    { w: 0.8, c: 'partnered', q: 'Received manual stimulation from a partner?', t: 'The other way round.' },
    { w: 0.8, c: 'partnered', q: 'Done oral both ways at once?', t: 'Sixty-nine.' },
    { w: 0.8, c: 'partnered', q: 'Used toys with a partner in the room?', t: 'Either of you working it.' },
    { w: 0.8, c: 'partnered', q: "Had concurrent partners with everyone's knowledge?", t: 'Open or poly. Cheating is elsewhere.' },
    { w: 1.5, c: 'partnered', q: 'Given oral sex?', t: 'Your mouth, their genitals.' },
    { w: 1.5, c: 'partnered', q: 'Received oral sex?', t: 'The other way round.' },
    { w: 1.5, c: 'partnered', q: 'Had vaginal intercourse?', t: 'Penetrative.' },
    { w: 1.5, c: 'partnered', q: 'Had anal intercourse?', t: 'Giving or receiving.' },
    { w: 1.5, c: 'partnered', q: 'Had sex without a condom or other barrier?', t: 'Any time, any reason.' },
    { w: 1.5, c: 'partnered', q: 'Had a one-night stand?', t: 'No plan for a second.' },
    { w: 1.5, c: 'partnered', q: 'Had sex on a first date?', t: 'Or before there was one.' },
    { w: 1.5, c: 'partnered', q: 'Had sex with five or more different people?', t: 'Lifetime count.' },
    { w: 1.5, c: 'partnered', q: 'Had sex while another person was in the room?', t: 'Asleep, pretending, or watching.' },
    { w: 2.5, c: 'partnered', q: "Had sex with someone whose name you didn't know?", t: 'Never learned it, or lost it by morning.' },
    { w: 2.5, c: 'partnered', q: 'Had a threesome?', t: 'Three, at once.' },
    { w: 2.5, c: 'partnered', q: 'Had group sex with four or more people?', t: 'Same room, same time.' },
    { w: 2.5, c: 'partnered', q: 'Been to a sex party, play party, bathhouse or club?', t: 'Sex happened on the premises.' },
    { w: 2.5, c: 'partnered', q: 'Had sex with twenty or more different people?', t: 'Lifetime count.' },
    { w: 2.5, c: 'partnered', q: 'Had sex with a teacher, or a student?', t: 'A power gap, either side of it.' },
    { w: 2.5, c: 'partnered', q: "Had sexual contact with a partner's parent, sibling or child?", t: 'No blood to you. Still off-limits.' },

    // family: the umbrella carries the weight, the rest are top-ups
    { w: 4,   c: 'partnered', q: 'Had sexual contact with a family member?', t: 'Any degree. The four below add to this one.' },
    { w: 0.8, c: 'partnered', q: 'Had sexual contact with a cousin?', t: 'Any degree.' },
    { w: 1.5, c: 'partnered', q: 'Had sexual contact with a sibling?', t: 'Full, half or step.' },
    { w: 2.5, c: 'partnered', q: 'Had sexual contact with a parent or step-parent?', t: 'Anyone who raised you as one.' },
    { w: 2.5, c: 'partnered', q: 'Had an ongoing sexual relationship with a relative?', t: 'Recurring, not one incident.' },

    // animals: same pattern
    { w: 4,   c: 'partnered', q: 'Had sexual contact with an animal?', t: 'Any. The two below add to this one.' },
    { w: 0.8, c: 'partnered', q: 'Had sexual contact with a farm animal?', t: 'Livestock, any species.' },
    { w: 1.5, c: 'partnered', q: 'Had sexual contact with a pet?', t: 'One you lived with.' },

    { w: 6,   c: 'partnered', q: 'Had sexual contact with a corpse?', t: 'Any contact, any circumstances.' },

    // ---------- kink ----------
    { w: 0.4, c: 'kink', q: 'Negotiated a scene with limits and a safeword first?', t: 'The talk before, not the scene.' },
    { w: 0.8, c: 'kink', q: 'Been spanked, or spanked a partner, sexually?', t: 'During sex, or on its own.' },
    { w: 0.8, c: 'kink', q: 'Restrained a partner, or been restrained?', t: 'Cuffs, rope, a belt, a headboard.' },
    { w: 0.8, c: 'kink', q: 'Done consensual degradation or humiliation?', t: 'Names and orders, agreed in advance.' },
    { w: 0.8, c: 'kink', q: 'Done pet play, or worn pet gear?', t: 'Collar, ears, tail, hood.' },
    { w: 0.8, c: 'kink', q: 'Done age play as adults?', t: 'Both of you adults.' },
    { w: 0.8, c: 'kink', q: 'Done erotic hypnosis?', t: 'Inducing, or going under.' },
    { w: 0.8, c: 'kink', q: 'Done pegging, or used a strap-on?', t: 'Wearing it or taking it.' },
    { w: 0.8, c: 'kink', q: 'Attended a fetish club, dungeon or munch?', t: 'Playing, or just there.' },
    { w: 1.5, c: 'kink', q: 'Done self-bondage?', t: 'Alone, which is the risky part.' },
    { w: 1.5, c: 'kink', q: "Held a partner's throat, or had yours held, with consent?", t: 'Hands, agreed beforehand.' },
    { w: 1.5, c: 'kink', q: 'Done rope bondage beyond simple tying?', t: 'Harnesses, suspension.' },
    { w: 1.5, c: 'kink', q: 'Done impact play that left marks?', t: 'Bruises the next day.' },
    { w: 1.5, c: 'kink', q: 'Done electro play?', t: 'TENS, violet wand, e-stim.' },
    { w: 1.5, c: 'kink', q: 'Worn or locked a partner in chastity for a day or more?', t: 'Continuous, not ten minutes.' },
    { w: 1.5, c: 'kink', q: 'Been in a 24/7 power exchange, or collared someone?', t: 'It ran outside the bedroom.' },
    { w: 1.5, c: 'kink', q: 'Done watersports?', t: 'Urine, on purpose.' },
    { w: 1.5, c: 'kink', q: 'Bitten, or been bitten, hard enough to break skin?', t: 'Primal play. Consensual.' },
    { w: 2.5, c: 'kink', q: 'Played out a consensual non-consent scene?', t: 'Scripted, negotiated, safeword live.' },
    { w: 2.5, c: 'kink', q: 'Done knife or edge play?', t: 'A blade on skin, no deep cuts.' },
    { w: 2.5, c: 'kink', q: 'Fisted a partner, or been fisted?', t: 'Vaginal or anal.' },
    { w: 2.5, c: 'kink', q: 'Done needle or blood play?', t: 'Skin pierced in a scene.' },
    { w: 2.5, c: 'kink', q: 'Done breath play beyond hands?', t: 'Bags, masks, rebreathing.' },
    { w: 2.5, c: 'kink', q: 'Done scat play?', t: 'Faeces, on purpose.' },
    { w: 2.5, c: 'kink', q: 'Done extreme insertion or stretching?', t: 'Oversized toys, objects, sounding.' },
    { w: 2.5, c: 'kink', q: 'Done gun play in a scene?', t: 'Unloaded, allegedly.' },
    { w: 4,   c: 'kink', q: "Broken a negotiated limit, yours or a partner's?", t: 'The line was agreed, then crossed.' },

    // ---------- digital ----------
    { w: 0.4, c: 'digital', q: 'Used a dating or hookup app?', t: 'Tinder, Grindr, Feeld, any of them.' },
    { w: 0.4, c: 'digital', q: 'Met someone from the internet in person?', t: 'First contact was online.' },
    { w: 0.4, c: 'digital', q: 'Had a relationship that was entirely online?', t: 'Never met in person.' },
    { w: 0.4, c: 'digital', q: 'Had e-sex with an AI chatbot?', t: 'Nobody else was involved.' },
    { w: 0.8, c: 'digital', q: 'Sexted?', t: 'Back and forth.' },
    { w: 0.8, c: 'digital', q: 'Had phone sex?', t: 'Voice, live.' },
    { w: 0.8, c: 'digital', q: 'Been on a sexual video call?', t: 'Cameras on, both of you.' },
    { w: 0.8, c: 'digital', q: 'Sent a nude?', t: 'To anyone, ever.' },
    { w: 0.8, c: 'digital', q: 'Had e-sex inside a game or virtual world?', t: 'VRChat, Second Life, a private server.' },
    { w: 0.8, c: 'digital', q: 'Used a remote-controlled toy with someone over the internet?', t: 'They had the app.' },
    { w: 1.5, c: 'digital', q: 'Sent a nude with your face in it?', t: 'Identifiable as you.' },
    { w: 1.5, c: 'digital', q: 'Had sex with someone you met on an app?', t: 'Matched, met, went through with it.' },
    { w: 1.5, c: 'digital', q: 'Paid for a private cam show?', t: 'One to one, live.' },
    { w: 1.5, c: 'digital', q: 'Recorded a sex tape?', t: 'With your partner knowing.' },
    { w: 2.5, c: 'digital', q: 'Posted nudes of yourself publicly?', t: 'Anonymous or not.' },
    { w: 2.5, c: 'digital', q: 'Sold explicit content of yourself?', t: 'A platform, or straight out of your DMs.' },
    { w: 2.5, c: 'digital', q: "Used someone else's photos to talk to people?", t: 'Catfishing.' },
    { w: 2.5, c: 'digital', q: 'Watched bestiality content?', t: 'Sought out, not stumbled into.' },
    { w: 2.5, c: 'digital', q: 'Sent an unsolicited explicit photo?', t: 'They had not asked.' },
    { w: 2.5, c: 'digital', q: 'Kept an explicit photo of someone after they asked you to delete it?', t: 'You said you had.' },
    { w: 4,   c: 'digital', q: 'Doxxed someone?', t: 'Address, workplace, on purpose.' },
    { w: 5,   c: 'digital', q: 'Made a deepfake of a real person for sexual purposes?', t: 'Real face, no consent.' },
    { w: 5,   c: 'digital', q: 'Shared an explicit image or video of someone without their consent?', t: 'Forwarding one nude counts.' },
    { w: 5,   c: 'digital', q: 'Filmed or photographed someone undressed or during sex without their knowledge?', t: 'A hidden camera, or not stopping.' },

    // ---------- substances ----------
    { w: 0.8, c: 'substances', q: 'Drunk alcohol?', t: 'More than a sip at dinner.' },
    { w: 0.8, c: 'substances', q: 'Smoked a cigarette or vaped nicotine?', t: 'Once counts.' },
    { w: 1.5, c: 'substances', q: 'Been drunk?', t: 'Past tipsy.' },
    { w: 1.5, c: 'substances', q: 'Smoked or eaten cannabis?', t: 'Any form.' },
    { w: 1.5, c: 'substances', q: "Been high or drunk somewhere you shouldn't have been?", t: 'Class, a shift, a family event.' },
    { w: 1.5, c: 'substances', q: 'Taken a psychedelic?', t: 'LSD, mushrooms, DMT.' },
    { w: 1.5, c: 'substances', q: 'Taken MDMA?', t: 'Pills or powder.' },
    { w: 1.5, c: 'substances', q: "Taken a prescription that wasn't yours, to get high?", t: 'Anything controlled.' },
    { w: 1.5, c: 'substances', q: 'Deliberately mixed drugs with alcohol?', t: 'Knowing the combination going in.' },
    { w: 2.5, c: 'substances', q: 'Blacked out from drinking?', t: 'Time you still cannot recall.' },
    { w: 2.5, c: 'substances', q: 'Taken cocaine, ketamine or amphetamines recreationally?', t: 'Not prescribed.' },
    { w: 2.5, c: 'substances', q: 'Bought drugs on the dark web or an encrypted app?', t: 'Mail order.' },
    { w: 2.5, c: 'substances', q: 'Taken a drug without knowing what it was?', t: 'Trusted the wrong pill.' },
    { w: 4,   c: 'substances', q: 'Used opioids recreationally?', t: 'Heroin, fentanyl, pills off-script.' },
    { w: 4,   c: 'substances', q: 'Injected a drug?', t: 'Outside medicine.' },

    // ---------- legal ----------
    { w: 0.4, c: 'legal', q: 'Been robbed or mugged?', t: 'Not something you chose.' },
    { w: 0.8, c: 'legal', q: 'Used a fake ID?', t: 'Bought, borrowed or made.' },
    { w: 0.8, c: 'legal', q: 'Trespassed?', t: 'Clearly off-limits.' },
    { w: 0.8, c: 'legal', q: 'Been detained or questioned by police?', t: 'Held, not necessarily charged.' },
    { w: 1.5, c: 'legal', q: 'Shoplifted?', t: 'Any value.' },
    { w: 1.5, c: 'legal', q: 'Vandalised property, or put up graffiti?', t: 'You could not undo it.' },
    { w: 1.5, c: 'legal', q: 'Been in a physical fight?', t: 'Punches thrown, either direction.' },
    { w: 1.5, c: 'legal', q: 'Bought illegal drugs?', t: 'For yourself. Dealing is further down.' },
    { w: 2.5, c: 'legal', q: 'Driven over the legal limit?', t: 'Alcohol, or anything else impairing.' },
    { w: 2.5, c: 'legal', q: 'Been arrested?', t: 'Booked.' },
    { w: 2.5, c: 'legal', q: 'Been convicted of a crime?', t: 'Any severity.' },
    { w: 2.5, c: 'legal', q: 'Spent a night in jail or prison?', t: 'Overnight or longer.' },
    { w: 2.5, c: 'legal', q: 'Carried an illegal weapon?', t: 'Anything you could not explain.' },
    { w: 2.5, c: 'legal', q: 'Paid for sex?', t: 'Money or goods, directly.' },
    { w: 2.5, c: 'legal', q: 'Been paid for sex?', t: 'Money or goods, directly.' },
    { w: 2.5, c: 'legal', q: 'Fled from, or evaded, the police?', t: 'On foot or in a car.' },
    { w: 4,   c: 'legal', q: 'Broken into a building or a vehicle?', t: 'No right to be there.' },
    { w: 4,   c: 'legal', q: 'Committed fraud or identity theft?', t: "Someone else's name." },
    { w: 4,   c: 'legal', q: 'Dealt drugs for money?', t: 'Regularly, not passing a friend a gram.' },
    { w: 4,   c: 'legal', q: 'Committed arson?', t: 'Set on purpose.' },
    { w: 5,   c: 'legal', q: 'Committed assault that caused injury?', t: 'Someone needed care.' },
    { w: 5,   c: 'legal', q: 'Threatened someone with a weapon?', t: 'They believed it.' },
    { w: 6,   c: 'legal', q: 'Sexually assaulted someone?', t: 'Non-consensual contact.' },
    { w: 6,   c: 'legal', q: 'Raped someone?', t: 'Without consent. Not regret.' },
    { w: 6,   c: 'legal', q: 'Drugged someone, or helped drug them, to get sex?', t: 'Spiked, for a body.' },
    { w: 6,   c: 'legal', q: 'Groomed someone for sex?', t: 'Built the trust on purpose.' },

    // ---------- risk ----------
    { w: 0.4, c: 'risk', q: 'Had a nude of you spread beyond who you sent it to?', t: 'Not something you chose.' },
    { w: 0.8, c: 'risk', q: 'Been fully naked outdoors?', t: 'You could have been seen.' },
    { w: 0.8, c: 'risk', q: 'Had a pregnancy scare?', t: 'Late period, split condom, bad week.' },
    { w: 0.8, c: 'risk', q: 'Taken emergency contraception?', t: 'Morning-after pill, any reason.' },
    { w: 0.8, c: 'risk', q: 'Had an STI?', t: 'Treated or not.' },
    { w: 1.5, c: 'risk', q: 'Flashed someone, or streaked?', t: 'Deliberate, in public.' },
    { w: 1.5, c: 'risk', q: 'Had sex in a car?', t: 'Parked counts.' },
    { w: 1.5, c: 'risk', q: 'Had sex outdoors?', t: 'Private-ish. Public is below.' },
    { w: 1.5, c: 'risk', q: 'Been caught mid-act by someone who was not meant to see?', t: 'Housemate, parent, stranger, police.' },
    { w: 1.5, c: 'risk', q: 'Had sex in a place of worship?', t: 'Presumably empty.' },
    { w: 1.5, c: 'risk', q: 'Had sex with a coworker, a boss or a subordinate?', t: 'Same payroll.' },
    { w: 1.5, c: 'risk', q: 'Been the person someone cheated with?', t: 'Knowing they had a partner.' },
    { w: 1.5, c: 'risk', q: 'Been pregnant, or got someone pregnant?', t: 'Any outcome.' },
    { w: 1.5, c: 'risk', q: 'Had sex you regretted once you sobered up?', t: 'You agreed at the time.' },
    { w: 2.5, c: 'risk', q: 'Had sex somewhere strangers could have seen you?', t: 'And you knew that going in.' },
    { w: 2.5, c: 'risk', q: 'Had sex in a public bathroom?', t: 'Bar, club, airport, festival.' },
    { w: 2.5, c: 'risk', q: 'Had sex on a plane, train or bus?', t: 'Other people aboard.' },
    { w: 2.5, c: 'risk', q: "Had sex somewhere you'd have been fired or expelled for it?", t: 'The office, campus, on shift.' },
    { w: 2.5, c: 'risk', q: 'Been watched having sex by a stranger, on purpose?', t: 'Dogging, cruising, an open window.' },
    { w: 2.5, c: 'risk', q: 'Cheated on a partner?', t: 'Anything you hid afterwards.' },
    { w: 2.5, c: 'risk', q: 'Lied about your sexual history to a partner?', t: 'Numbers, tests, or who.' },
    { w: 2.5, c: 'risk', q: 'Been to hospital for an injury from sex or a scene?', t: 'It needed attention.' },
    { w: 4,   c: 'risk', q: 'Had sex while driving?', t: 'One of you at the wheel.' }

];
