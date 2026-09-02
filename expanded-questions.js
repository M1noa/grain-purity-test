// ---------------------------------------------------------------------------
// expanded test questions. this is the only file you edit to change the test.
//
//   w = weight  (how much checking it costs you)
//   c = category (drives the bars on the result page)
//   q = the question text
//   t = the tooltip
//
// weights, pick the nearest (any number works, not just these):
//   0.4  trivial   held hands, been on a date
//   0.8  mild      kissing, masturbated, drank alcohol
//   1.5  notable   oral, intercourse, been drunk, weed
//   2.5  heavy     unprotected, group, arrested, hard drugs
//   4    extreme   convictions, paid sex, animal contact
//   5    criminal  deepfakes, revenge porn, just shy of the worst
//   6    felonious rape, incest with a parent, the worst of the worst
//
// to add a question: copy a line, change the four fields.
// to remove one: delete the line. numbering is CSS counters, nothing to renumber.
// to add a category: just use a new c value. its bar appears on its own,
//   in the order it first shows up below.
// nothing is sent anywhere, so none of this leaves the browser either way.
// ---------------------------------------------------------------------------

const QUESTIONS = [

    // ---------- affection ----------
    { w: 0.4, c: 'affection', q: 'Held hands with romantic intent?', t: 'Fingers interlocked with someone you were interested in. Not a handshake, not a parent.' },
    { w: 0.4, c: 'affection', q: 'Been on a date?', t: 'A planned outing with romantic intent, however it went.' },
    { w: 0.4, c: 'affection', q: 'Asked someone out, or been asked out?', t: 'Either direction counts, and so does a no.' },
    { w: 0.4, c: 'affection', q: 'Been in a relationship?', t: 'Both of you agreed you were together, however briefly.' },
    { w: 0.8, c: 'affection', q: 'Kissed someone on the lips?', t: 'Closed-mouth counts.' },
    { w: 0.8, c: 'affection', q: 'Kissed with tongue?', t: 'French kissing.' },
    { w: 0.8, c: 'affection', q: 'Given or received a hickey?', t: 'A mark that was still there the next day.' },
    { w: 0.8, c: 'affection', q: 'Shared a bed with someone overnight?', t: 'Actually slept there, whether or not anything happened.' },
    { w: 0.8, c: 'affection', q: 'Said "I love you" to a partner and meant it?', t: 'Romantically. Family and friends do not count.' },
    { w: 1.5, c: 'affection', q: 'Had a relationship end over sex?', t: 'Wanting it, not wanting it, or someone else getting it.' },

    // ---------- solo ----------
    { w: 0.8, c: 'solo', q: 'Masturbated?', t: 'By yourself, finished or not.' },
    { w: 0.8, c: 'solo', q: 'Watched porn?', t: 'Any format, on purpose.' },
    { w: 0.8, c: 'solo', q: 'Fantasised sexually about someone you actually know?', t: 'A friend, a classmate, a coworker.' },
    { w: 0.8, c: 'solo', q: 'Used a sex toy on yourself?', t: 'Vibrator, sleeve, plug, anything bought for the job.' },
    { w: 1.5, c: 'solo', q: 'Watched porn most days for a month or longer?', t: 'A sustained habit, not the occasional look.' },
    { w: 1.5, c: 'solo', q: 'Owned more than three sex toys at once?', t: 'A collection rather than one purchase.' },
    { w: 1.5, c: 'solo', q: 'Masturbated somewhere you could have been caught?', t: 'Shared room, a work bathroom, a car.' },
    { w: 1.5, c: 'solo', q: 'Paid for porn or subscribed to an adult creator?', t: 'One-off or recurring, any platform.' },
    { w: 1.5, c: 'solo', q: 'Masturbated while on a call with someone?', t: 'Voice or video, them there for it.' },
    { w: 1.5, c: 'solo', q: 'Orgasmed from something other than direct genital contact?', t: 'Nipples, prostate, a fantasy alone, in your sleep.' },
    { w: 2.5, c: 'solo', q: 'Fantasised sexually about an animal?', t: 'A real recurring thought. Still only a thought.' },
    { w: 0.8, c: 'solo', q: 'Written explicit fiction or made explicit art?', t: 'For yourself or to share.' },
    { w: 2.5, c: 'solo', q: 'Masturbated in a public or semi-public place?', t: 'A park, a changing room, a parked car.' },

    // ---------- partnered ----------
    { w: 1.5, c: 'partnered', q: 'Given manual stimulation to a partner?', t: 'A handjob, or fingering.' },
    { w: 1.5, c: 'partnered', q: 'Received manual stimulation from a partner?', t: 'The other direction of the same thing.' },
    { w: 1.5, c: 'partnered', q: 'Given oral sex?', t: 'Your mouth on their genitals.' },
    { w: 1.5, c: 'partnered', q: 'Received oral sex?', t: 'Their mouth on yours.' },
    { w: 1.5, c: 'partnered', q: 'Had vaginal intercourse?', t: 'Penetrative sex.' },
    { w: 1.5, c: 'partnered', q: 'Had anal intercourse?', t: 'Giving or receiving.' },
    { w: 1.5, c: 'partnered', q: 'Done oral both ways at once?', t: 'Sixty-nine.' },
    { w: 1.5, c: 'partnered', q: 'Used toys with a partner in the room?', t: 'Yours or theirs, either of you working it.' },
    { w: 1.5, c: 'partnered', q: 'Had a one-night stand?', t: 'Once, with no plan for a second time.' },
    { w: 2.5, c: 'partnered', q: 'Had sex on a first date?', t: 'Or before there was one.' },
    { w: 2.5, c: 'partnered', q: 'Had sex without a condom or other barrier?', t: 'Any time, for any reason.' },
    { w: 2.5, c: 'partnered', q: "Had sex with someone whose name you didn't know?", t: 'Never learned it, or lost it by morning.' },
    { w: 2.5, c: 'partnered', q: 'Had sex with five or more different people?', t: 'Lifetime count.' },
    { w: 2.5, c: 'partnered', q: 'Had sex with someone of the same gender as you?', t: 'Any sexual contact. Once counts.' },
    { w: 2.5, c: 'partnered', q: 'Had a threesome?', t: 'Three people, at the same time.' },
    { w: 2.5, c: 'partnered', q: 'Had group sex with four or more people?', t: 'Everyone involved, same room, same time.' },
    { w: 2.5, c: 'partnered', q: 'Had sex while another person was in the room?', t: 'Asleep, pretending to be, or watching.' },
    { w: 2.5, c: 'partnered', q: "Had concurrent partners with everyone's knowledge?", t: 'Open or polyamorous. Cheating is further down.' },
    { w: 2.5, c: 'partnered', q: 'Been to a sex party, play party, bathhouse or club?', t: 'Somewhere sex happens on the premises.' },
    { w: 4,   c: 'partnered', q: 'Had sex with twenty or more different people?', t: 'Lifetime count.' },
    { w: 4,   c: 'partnered', q: 'Had sexual contact with a family member?', t: 'Any degree of relation.' },
    { w: 6,   c: 'partnered', q: 'Had sexual contact with a sibling?', t: 'Full or half, biological or step.' },
    { w: 6,   c: 'partnered', q: 'Had sexual contact with a parent or step-parent?', t: 'Anyone who raised you as one.' },
    { w: 4,   c: 'partnered', q: 'Had sexual contact with a cousin?', t: 'Any degree.' },
    { w: 6,   c: 'partnered', q: 'Had an ongoing sexual relationship with a relative?', t: 'A recurring thing, not one isolated incident.' },
    { w: 4,   c: 'partnered', q: "Had sexual contact with a partner's parent, sibling or child?", t: 'Not blood to you, very much off-limits.' },
    { w: 4,   c: 'partnered', q: 'Had sexual contact with an animal?', t: 'Any.' },
    { w: 6,   c: 'partnered', q: 'Had sexual contact with a pet?', t: 'An animal you lived with.' },
    { w: 4,   c: 'partnered', q: 'Had sexual contact with a farm animal?', t: 'Livestock, any species.' },
    { w: 4,   c: 'partnered', q: 'Had sex with a teacher, or a student?', t: 'A power gap, however it started.' },
    { w: 6,   c: 'partnered', q: 'Had sexual contact with a corpse?', t: 'Any circumstances, any contact.' },

    // ---------- kink ----------
    { w: 0.8, c: 'kink', q: 'Been spanked, or spanked a partner, sexually?', t: 'During sex, or as its own thing.' },
    { w: 1.5, c: 'kink', q: 'Restrained a partner, or been restrained?', t: 'Cuffs, rope, a belt, a tie, a headboard.' },
    { w: 1.5, c: 'kink', q: "Held a partner's throat, or had yours held, with consent?", t: 'Hands, agreed beforehand.' },
    { w: 2.5, c: 'kink', q: 'Negotiated a scene with limits and a safeword first?', t: 'An explicit pre-talk and an agreed word.' },
    { w: 2.5, c: 'kink', q: 'Done rope bondage beyond simple tying?', t: 'Harnesses, decorative ties, suspension.' },
    { w: 2.5, c: 'kink', q: 'Done impact play that left marks?', t: 'Flogger, cane, paddle, belt. Bruises the next day.' },
    { w: 2.5, c: 'kink', q: 'Done electro play?', t: 'TENS unit, violet wand, e-stim.' },
    { w: 2.5, c: 'kink', q: 'Worn or locked a partner in chastity for a day or more?', t: 'Continuous, not ten minutes.' },
    { w: 2.5, c: 'kink', q: 'Done consensual degradation or humiliation?', t: 'Names, orders, embarrassment, agreed in advance.' },
    { w: 2.5, c: 'kink', q: 'Been in a 24/7 power exchange, or collared someone?', t: 'The dynamic runs outside the bedroom too.' },
    { w: 2.5, c: 'kink', q: 'Played out a consensual non-consent scene?', t: 'Scripted resistance, negotiated first, safeword live.' },
    { w: 2.5, c: 'kink', q: 'Done pet play, or worn pet gear?', t: 'Collar, ears, tail, hood, mitts.' },
    { w: 2.5, c: 'kink', q: 'Done age play as adults?', t: 'Regression roles between adults.' },
    { w: 2.5, c: 'kink', q: 'Done watersports?', t: 'Urine, on purpose.' },
    { w: 2.5, c: 'kink', q: 'Done knife or edge play?', t: 'A blade on skin, consensually, without deep cuts.' },
    { w: 2.5, c: 'kink', q: 'Done pegging, or used a strap-on?', t: 'Wearing it or receiving it.' },
    { w: 2.5, c: 'kink', q: 'Fisted a partner, or been fisted?', t: 'Vaginal or anal.' },
    { w: 2.5, c: 'kink', q: 'Bitten, or been bitten, hard enough to break skin?', t: 'Primal play. Consensual.' },
    { w: 2.5, c: 'kink', q: 'Attended a fetish club, dungeon or munch?', t: 'A kink space, playing or just socialising.' },
    { w: 4,   c: 'kink', q: 'Done needle or blood play?', t: 'Piercing skin as part of a scene.' },
    { w: 4,   c: 'kink', q: 'Done breath play beyond hands?', t: 'Bags, masks, rebreathing.' },
    { w: 4,   c: 'kink', q: 'Done scat play?', t: 'Faeces, on purpose.' },
    { w: 4,   c: 'kink', q: 'Done extreme insertion or stretching?', t: 'Oversized toys, objects, sounding.' },
    { w: 2.5, c: 'kink', q: 'Done self-bondage?', t: 'Tied yourself up, alone.' },
    { w: 4,   c: 'kink', q: 'Done erotic hypnosis?', t: 'Inducing or receiving a trance for a scene.' },
    { w: 6,   c: 'kink', q: 'Done gun play in a scene?', t: 'Replica or real. Unloaded, allegedly.' },

    // ---------- digital ----------
    { w: 0.8, c: 'digital', q: 'Sexted?', t: 'Explicit messages, back and forth.' },
    { w: 0.8, c: 'digital', q: 'Had phone sex?', t: 'Voice, live.' },
    { w: 1.5, c: 'digital', q: 'Been on a sexual video call?', t: 'Cameras on, both of you.' },
    { w: 1.5, c: 'digital', q: 'Sent a nude?', t: 'Anything explicit, to anyone.' },
    { w: 1.5, c: 'digital', q: 'Sent a nude with your face in it?', t: 'Identifiable as you.' },
    { w: 1.5, c: 'digital', q: 'Used a dating or hookup app?', t: 'Tinder, Grindr, Hinge, Feeld, any of them.' },
    { w: 1.5, c: 'digital', q: 'Met someone from the internet in person?', t: 'First contact was online.' },
    { w: 1.5, c: 'digital', q: 'Had e-sex inside a game or virtual world?', t: 'VRChat, Second Life, an MMO, a private server.' },
    { w: 1.5, c: 'digital', q: 'Had a relationship that was entirely online?', t: 'Never met in person.' },
    { w: 1.5, c: 'digital', q: 'Used a remote-controlled toy with someone over the internet?', t: 'They had the app, you had the toy.' },
    { w: 2.5, c: 'digital', q: 'Had sex with someone you met on an app?', t: 'Matched, met up, went through with it.' },
    { w: 2.5, c: 'digital', q: 'Had e-sex with an AI chatbot?', t: 'Character.ai, a local model, any of them.' },
    { w: 2.5, c: 'digital', q: 'Paid for a private cam show?', t: 'One to one, paid, live.' },
    { w: 2.5, c: 'digital', q: 'Recorded a sex tape?', t: 'Photo or video, with your partner knowing.' },
    { w: 2.5, c: 'digital', q: 'Posted nudes of yourself publicly?', t: 'Anonymous or not, any platform.' },
    { w: 2.5, c: 'digital', q: "Used someone else's photos to talk to people?", t: 'Catfishing.' },
    { w: 4,   c: 'digital', q: 'Sold explicit content of yourself?', t: 'OnlyFans, Fansly, straight out of your DMs.' },
    { w: 5,   c: 'digital', q: 'Watched bestiality content?', t: 'Sought out, not stumbled across. One step back from the act.' },
    { w: 6,   c: 'digital', q: 'Made a deepfake of a real person for sexual purposes?', t: 'Real face, fabricated scenario, no consent.' },
    { w: 6,   c: 'digital', q: 'Shared an explicit image or video of someone without their consent?', t: 'Revenge porn, forwarding a nude, leaking a tape.' },
    { w: 4,   c: 'digital', q: 'Doxxed someone?', t: 'Address, workplace, anything identifying, on purpose.' },
    { w: 6,   c: 'digital', q: 'Filmed or photographed someone undressed or during sex without their knowledge?', t: 'A hidden camera, a spy shot, not stopping the recording.' },

    // ---------- substances ----------
    { w: 0.8, c: 'substances', q: 'Drunk alcohol?', t: 'More than a sip at a family dinner.' },
    { w: 1.5, c: 'substances', q: 'Been drunk?', t: 'Properly drunk, not tipsy.' },
    { w: 1.5, c: 'substances', q: 'Blacked out from drinking?', t: 'Lost time you still cannot recall.' },
    { w: 1.5, c: 'substances', q: 'Smoked a cigarette or vaped nicotine?', t: 'Once counts.' },
    { w: 1.5, c: 'substances', q: 'Smoked or eaten cannabis?', t: 'Any form.' },
    { w: 1.5, c: 'substances', q: "Been high or drunk somewhere you shouldn't have been?", t: 'Class, a shift, a family event.' },
    { w: 2.5, c: 'substances', q: 'Taken a psychedelic?', t: 'LSD, mushrooms, DMT, similar.' },
    { w: 2.5, c: 'substances', q: 'Taken MDMA?', t: 'Pills or powder.' },
    { w: 2.5, c: 'substances', q: 'Taken cocaine, ketamine or amphetamines recreationally?', t: 'Not prescribed, not medical.' },
    { w: 2.5, c: 'substances', q: "Taken a prescription that wasn't yours, to get high?", t: 'Anything controlled.' },
    { w: 2.5, c: 'substances', q: 'Deliberately mixed drugs with alcohol?', t: 'Knowing the combination going in.' },
    { w: 4,   c: 'substances', q: 'Used opioids recreationally?', t: 'Heroin, fentanyl, pills outside a prescription.' },
    { w: 4,   c: 'substances', q: 'Injected a drug?', t: 'Any drug, outside medicine.' },
    { w: 4,   c: 'substances', q: 'Taken a drug without knowing what it was?', t: 'Trusted the wrong person, or the wrong pill.' },
    { w: 4,   c: 'substances', q: 'Bought drugs on the dark web or an encrypted app?', t: 'Mail order, with plausible deniability.' },

    // ---------- legal ----------
    { w: 1.5, c: 'legal', q: 'Drunk alcohol underage?', t: 'By the law where you were.' },
    { w: 1.5, c: 'legal', q: 'Shoplifted?', t: 'Any value.' },
    { w: 1.5, c: 'legal', q: 'Used a fake ID?', t: 'Bought, borrowed or made.' },
    { w: 1.5, c: 'legal', q: 'Trespassed?', t: 'Somewhere clearly off-limits.' },
    { w: 1.5, c: 'legal', q: 'Vandalised property, or put up graffiti?', t: 'Anything you could not undo after.' },
    { w: 2.5, c: 'legal', q: 'Bought or sold illegal drugs?', t: 'Either side of the exchange.' },
    { w: 2.5, c: 'legal', q: 'Been in a physical fight?', t: 'Punches thrown, either direction.' },
    { w: 2.5, c: 'legal', q: 'Driven over the legal limit?', t: 'Alcohol or anything else impairing.' },
    { w: 2.5, c: 'legal', q: 'Been detained or questioned by police?', t: 'Held, not necessarily charged.' },
    { w: 2.5, c: 'legal', q: 'Been arrested?', t: 'Booked.' },
    { w: 4,   c: 'legal', q: 'Been convicted of a crime?', t: 'Any conviction, any severity.' },
    { w: 4,   c: 'legal', q: 'Spent a night in jail or prison?', t: 'Overnight or longer.' },
    { w: 4,   c: 'legal', q: 'Paid for sex?', t: 'Money or goods, directly for it.' },
    { w: 4,   c: 'legal', q: 'Been paid for sex?', t: 'Money or goods, directly for it.' },
    { w: 4,   c: 'legal', q: 'Been robbed or mugged?', t: 'Property or cash taken under threat.' },
    { w: 6,   c: 'legal', q: 'Broken into a building or a vehicle?', t: 'Somewhere you had no right to be.' },
    { w: 6,   c: 'legal', q: 'Committed fraud or identity theft?', t: "Someone else's money, someone else's name." },
    { w: 6,   c: 'legal', q: 'Dealt drugs for money?', t: 'Regularly, not just passing something to a friend.' },
    { w: 6,   c: 'legal', q: 'Committed arson?', t: 'A fire set on purpose, any damage.' },
    { w: 6,   c: 'legal', q: 'Fled from, or evaded, the police?', t: 'On foot or in a car.' },
    { w: 6,   c: 'legal', q: 'Sexually assaulted someone?', t: 'Non-consensual contact, whatever the outcome.' },
    { w: 6,   c: 'legal', q: 'Raped someone?', t: 'Not "regretted it the next morning". Without consent.' },
    { w: 6,   c: 'legal', q: 'Groomed someone for sex?', t: 'Building trust with a target over time, on purpose.' },
    { w: 6,   c: 'legal', q: 'Committed assault that caused injury?', t: 'Beyond a scrap. Someone needed care.' },
    { w: 6,   c: 'legal', q: 'Threatened someone with a weapon?', t: 'Any weapon, any intent, they believed it.' },
    { w: 6,   c: 'legal', q: 'Drugged someone, or helped drug them, to get sex?', t: 'Spiked or slipped, for a body.' },
    { w: 4,   c: 'legal', q: 'Carried an illegal weapon?', t: 'Knife, firearm, anything you could not explain.' },

    // ---------- risk ----------
    { w: 1.5, c: 'risk', q: 'Been fully naked outdoors?', t: 'Somewhere you could have been seen.' },
    { w: 1.5, c: 'risk', q: 'Flashed someone, or streaked?', t: 'Deliberate, in public.' },
    { w: 1.5, c: 'risk', q: 'Had sex in a car?', t: 'Parked or otherwise.' },
    { w: 1.5, c: 'risk', q: 'Had sex outdoors?', t: 'Woods, a beach, a garden, a roof.' },
    { w: 1.5, c: 'risk', q: 'Had a pregnancy scare?', t: 'A late period, a split condom, a bad week.' },
    { w: 2.5, c: 'risk', q: 'Had sex somewhere strangers could have seen you?', t: 'And you knew that when you started.' },
    { w: 2.5, c: 'risk', q: 'Been caught mid-act by someone who was not meant to see?', t: 'Housemate, parent, stranger, police.' },
    { w: 2.5, c: 'risk', q: 'Had sex in a public bathroom?', t: 'Bar, club, airport, festival.' },
    { w: 2.5, c: 'risk', q: 'Had sex on a plane, train or bus?', t: 'In transit, with other people aboard.' },
    { w: 2.5, c: 'risk', q: "Had sex somewhere you'd have been fired or expelled for it?", t: 'The office, campus, on shift.' },
    { w: 2.5, c: 'risk', q: 'Been watched having sex by a stranger, on purpose?', t: 'Exhibitionism, dogging, cruising.' },
    { w: 2.5, c: 'risk', q: 'Taken emergency contraception?', t: 'Morning-after pill, any reason.' },
    { w: 2.5, c: 'risk', q: 'Had an STI?', t: 'Treated or not.' },
    { w: 2.5, c: 'risk', q: 'Cheated on a partner?', t: 'Anything you hid from them afterwards.' },
    { w: 2.5, c: 'risk', q: 'Been the person someone cheated with?', t: 'Knowing they had a partner.' },
    { w: 2.5, c: 'risk', q: 'Had a nude of you spread beyond who you sent it to?', t: 'Screenshotted, forwarded, leaked.' },
    { w: 2.5, c: 'risk', q: 'Had sex with a coworker, a boss or a subordinate?', t: 'Same workplace.' },
    { w: 4,   c: 'risk', q: 'Been pregnant, or got someone pregnant?', t: 'Any outcome.' },
    { w: 4,   c: 'risk', q: 'Had sex in a place of worship?', t: 'Any denomination, presumably empty.' },
    { w: 4,   c: 'risk', q: 'Had sex while driving?', t: 'Moving or stopped, one of you at the wheel.' },
    { w: 4,   c: 'risk', q: 'Been to hospital for an injury from sex or a scene?', t: 'Something needed attention, not just lying about it.' }

];