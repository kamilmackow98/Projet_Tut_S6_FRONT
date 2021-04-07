import { ClassNameMap } from "@material-ui/styles";

export type GenericKeyObject<K extends keyof any, T> = {
	[P in K]?: T;
};

export interface UserType {
	token: string;
	isAuthenticated: boolean;
};

export type Screenshot = {
    id: number,
    path_thumbnail: string,
    path_full: string
};

export type Movie = {
    id: number,
    name: string,
    thumbnail: string,
    webm: Webm,
    highlight: boolean
};

export type Library = {
	library: number[]
};

export type SortFilter = {
    sortBy: string,
    isASC: boolean
};

export type DateFilter = {
	gte?: Date | string;
	gt?: Date | string;
	lt?: Date | string;
	lte?: Date | string;
};

export type Publisher = {
	name: string;
};

export type Developer = {
	name: string;
};

export type Tag = {
	name: string;
};

export type Category = {
	name: string;
};

export type Platform = {
	name: string;
};

export type Genre = {
	name: string;
};

export type Age = {
	age: number;
};

export type GameSearchResult = {
    games: Game[],
    numberOfPages: number,
    currentPage: number
};

export type TagFilter = {
    tags: string[]
};

export type TagCloud = {
    value: string,
    count: number
};

export type FullTag = {
    name: string,
    value?: string
};

type Webm = {
    480: string, 
    max: string
};

export type APIErrorMessage = {
	message: string;
};

export type Filters = {
    name?: string,
    release_date?: DateFilter,
    developer?: string[],
    publisher?: string[],
    platforms?: string[],
    categories?: string[],
    genres?: string[],
    steamspy_tags?: string[],
    required_age?: number[],
	positive_rating_percent?: number,
	sort?: SortFilter,
	library?: boolean
} | undefined;

export type Requirements = {
    minimum: string | undefined,
    recommended: string | undefined
};

export type Game = {
	id: number;
	name: string;
	release_date: Date;
	english: boolean;
	developer: string[];
	publisher: string[];
	platforms: string[];
	required_age: number;
	categories: string[];
	genres: string[];
	steamspy_tags: string[];
	achievements: number;
	positive_ratings: number;
	negative_ratings: number;
	average_playtime: number;
	median_playtime: number;
	owners: string;
	price: number;
	detailed_description: string;
	about_the_game: string;
	short_description: string;
	pc_requirements?: Requirements;
	mac_requirements?: Requirements;
	linux_requirements?: Requirements;
	minumum: string;
	recommended: string;
	header_image: string;
	screenshots: Screenshot[];
	background: string;
	movies?: Movie[];
	tag_1980s: number;
	tag_1990s: number;
	tag_2$5d: number;
	tag_2d: number;
	tag_2d_fighter: number;
	tag_360_video: number;
	tag_3d: number;
	tag_3d_platformer: number;
	tag_3d_vision: number;
	tag_4_player_local: number;
	tag_4x: number;
	tag_6dof: number;
	tag_atv: number;
	tag_abstract: number;
	tag_action: number;
	tag_action_rpg: number;
	tag_action_adventure: number;
	tag_addictive: number;
	tag_adventure: number;
	tag_agriculture: number;
	tag_aliens: number;
	tag_alternate_history: number;
	tag_america: number;
	tag_animation_and_modeling: number;
	tag_anime: number;
	tag_arcade: number;
	tag_arena_shooter: number;
	tag_artificial_intelligence: number;
	tag_assassin: number;
	tag_asynchronous_multiplayer: number;
	tag_atmospheric: number;
	tag_audio_production: number;
	tag_bmx: number;
	tag_base_building: number;
	tag_baseball: number;
	tag_based_on_a_novel: number;
	tag_basketball: number;
	tag_batman: number;
	tag_battle_royale: number;
	tag_beat_em_up: number;
	tag_beautiful: number;
	tag_benchmark: number;
	tag_bikes: number;
	tag_blood: number;
	tag_board_game: number;
	tag_bowling: number;
	tag_building: number;
	tag_bullet_hell: number;
	tag_bullet_time: number;
	tag_crpg: number;
	tag_capitalism: number;
	tag_card_game: number;
	tag_cartoon: number;
	tag_cartoony: number;
	tag_casual: number;
	tag_cats: number;
	tag_character_action_game: number;
	tag_character_customization: number;
	tag_chess: number;
	tag_choices_matter: number;
	tag_choose_your_own_adventure: number;
	tag_cinematic: number;
	tag_city_builder: number;
	tag_class_based: number;
	tag_classic: number;
	tag_clicker: number;
	tag_co_op: number;
	tag_co_op_campaign: number;
	tag_cold_war: number;
	tag_colorful: number;
	tag_comedy: number;
	tag_comic_book: number;
	tag_competitive: number;
	tag_conspiracy: number;
	tag_controller: number;
	tag_conversation: number;
	tag_crafting: number;
	tag_crime: number;
	tag_crowdfunded: number;
	tag_cult_classic: number;
	tag_cute: number;
	tag_cyberpunk: number;
	tag_cycling: number;
	tag_dark: number;
	tag_dark_comedy: number;
	tag_dark_fantasy: number;
	tag_dark_humor: number;
	tag_dating_sim: number;
	tag_demons: number;
	tag_design_and_illustration: number;
	tag_destruction: number;
	tag_detective: number;
	tag_difficult: number;
	tag_dinosaurs: number;
	tag_diplomacy: number;
	tag_documentary: number;
	tag_dog: number;
	tag_dragons: number;
	tag_drama: number;
	tag_driving: number;
	tag_dungeon_crawler: number;
	tag_dungeons_and_dragons: number;
	tag_dynamic_narration: number;
	tag_dystopian: number;
	tag_early_access: number;
	tag_economy: number;
	tag_education: number;
	tag_emotional: number;
	tag_epic: number;
	tag_episodic: number;
	tag_experience: number;
	tag_experimental: number;
	tag_exploration: number;
	tag_fmv: number;
	tag_fps: number;
	tag_faith: number;
	tag_family_friendly: number;
	tag_fantasy: number;
	tag_fast_paced: number;
	tag_feature_film: number;
	tag_female_protagonist: number;
	tag_fighting: number;
	tag_first_person: number;
	tag_fishing: number;
	tag_flight: number;
	tag_football: number;
	tag_foreign: number;
	tag_free_to_play: number;
	tag_funny: number;
	tag_futuristic: number;
	tag_gambling: number;
	tag_game_development: number;
	tag_gamemaker: number;
	tag_games_workshop: number;
	tag_gaming: number;
	tag_god_game: number;
	tag_golf: number;
	tag_gore: number;
	tag_gothic: number;
	tag_grand_strategy: number;
	tag_great_soundtrack: number;
	tag_grid_based_movement: number;
	tag_gun_customization: number;
	tag_hack_and_slash: number;
	tag_hacking: number;
	tag_hand_drawn: number;
	tag_hardware: number;
	tag_heist: number;
	tag_hex_grid: number;
	tag_hidden_object: number;
	tag_historical: number;
	tag_hockey: number;
	tag_horror: number;
	tag_horses: number;
	tag_hunting: number;
	tag_illuminati: number;
	tag_indie: number;
	tag_intentionally_awkward_controls: number;
	tag_interactive_fiction: number;
	tag_inventory_management: number;
	tag_investigation: number;
	tag_isometric: number;
	tag_jrpg: number;
	tag_jet: number;
	tag_kickstarter: number;
	tag_lego: number;
	tag_lara_croft: number;
	tag_lemmings: number;
	tag_level_editor: number;
	tag_linear: number;
	tag_local_co_op: number;
	tag_local_multiplayer: number;
	tag_logic: number;
	tag_loot: number;
	tag_lore_rich: number;
	tag_lovecraftian: number;
	tag_mmorpg: number;
	tag_moba: number;
	tag_magic: number;
	tag_management: number;
	tag_mars: number;
	tag_martial_arts: number;
	tag_massively_multiplayer: number;
	tag_masterpiece: number;
	tag_match_3: number;
	tag_mature: number;
	tag_mechs: number;
	tag_medieval: number;
	tag_memes: number;
	tag_metroidvania: number;
	tag_military: number;
	tag_mini_golf: number;
	tag_minigames: number;
	tag_minimalist: number;
	tag_mining: number;
	tag_mod: number;
	tag_moddable: number;
	tag_modern: number;
	tag_motocross: number;
	tag_motorbike: number;
	tag_mouse_only: number;
	tag_movie: number;
	tag_multiplayer: number;
	tag_multiple_endings: number;
	tag_music: number;
	tag_music_based_procedural_generation: number;
	tag_mystery: number;
	tag_mystery_dungeon: number;
	tag_mythology: number;
	tag_nsfw: number;
	tag_narration: number;
	tag_naval: number;
	tag_ninja: number;
	tag_noir: number;
	tag_nonlinear: number;
	tag_nudity: number;
	tag_offroad: number;
	tag_old_school: number;
	tag_on_rails_shooter: number;
	tag_online_co_op: number;
	tag_open_world: number;
	tag_otome: number;
	tag_parkour: number;
	tag_parody: number;
	tag_party_based_rpg: number;
	tag_perma_death: number;
	tag_philisophical: number;
	tag_photo_editing: number;
	tag_physics: number;
	tag_pinball: number;
	tag_pirates: number;
	tag_pixel_graphics: number;
	tag_platformer: number;
	tag_point_and_click: number;
	tag_political: number;
	tag_politics: number;
	tag_pool: number;
	tag_post_apocalyptic: number;
	tag_procedural_generation: number;
	tag_programming: number;
	tag_psychedelic: number;
	tag_psychological: number;
	tag_psychological_horror: number;
	tag_puzzle: number;
	tag_puzzle_platformer: number;
	tag_pve: number;
	tag_pvp: number;
	tag_quick_time_events: number;
	tag_rpg: number;
	tag_rpgmaker: number;
	tag_rts: number;
	tag_racing: number;
	tag_real_time_tactics: number;
	tag_real_time: number;
	tag_real_time_with_pause: number;
	tag_realistic: number;
	tag_relaxing: number;
	tag_remake: number;
	tag_replay_value: number;
	tag_resource_management: number;
	tag_retro: number;
	tag_rhythm: number;
	tag_robots: number;
	tag_rogue_like: number;
	tag_rogue_lite: number;
	tag_romance: number;
	tag_rome: number;
	tag_runner: number;
	tag_sailing: number;
	tag_sandbox: number;
	tag_satire: number;
	tag_sci_fi: number;
	tag_science: number;
	tag_score_attack: number;
	tag_sequel: number;
	tag_sexual_content: number;
	tag_shoot_em_up: number;
	tag_shooter: number;
	tag_short: number;
	tag_side_scroller: number;
	tag_silent_protagonist: number;
	tag_simulation: number;
	tag_singleplayer: number;
	tag_skateboarding: number;
	tag_skating: number;
	tag_skiing: number;
	tag_sniper: number;
	tag_snow: number;
	tag_snowboarding: number;
	tag_soccer: number;
	tag_software: number;
	tag_software_training: number;
	tag_sokoban: number;
	tag_souls_like: number;
	tag_soundtrack: number;
	tag_space: number;
	tag_space_sim: number;
	tag_spectacle_fighter: number;
	tag_spelling: number;
	tag_split_screen: number;
	tag_sports: number;
	tag_star_wars: number;
	tag_stealth: number;
	tag_steam_machine: number;
	tag_steampunk: number;
	tag_story_rich: number;
	tag_strategy: number;
	tag_strategy_rpg: number;
	tag_stylized: number;
	tag_submarine: number;
	tag_superhero: number;
	tag_supernatural: number;
	tag_surreal: number;
	tag_survival: number;
	tag_survival_horror: number;
	tag_swordplay: number;
	tag_tactical: number;
	tag_tactical_rpg: number;
	tag_tanks: number;
	tag_team_based: number;
	tag_tennis: number;
	tag_text_based: number;
	tag_third_person: number;
	tag_third_person_shooter: number;
	tag_thriller: number;
	tag_time_attack: number;
	tag_time_management: number;
	tag_time_manipulation: number;
	tag_time_travel: number;
	tag_top_down: number;
	tag_top_down_shooter: number;
	tag_touch_friendly: number;
	tag_tower_defense: number;
	tag_trackir: number;
	tag_trading: number;
	tag_trading_card_game: number;
	tag_trains: number;
	tag_transhumanism: number;
	tag_turn_based: number;
	tag_turn_based_combat: number;
	tag_turn_based_strategy: number;
	tag_turn_based_tactics: number;
	tag_tutorial: number;
	tag_twin_stick_shooter: number;
	tag_typing: number;
	tag_underground: number;
	tag_underwater: number;
	tag_unforgiving: number;
	tag_utilities: number;
	tag_vr: number;
	tag_vr_only: number;
	tag_vampire: number;
	tag_video_production: number;
	tag_villain_protagonist: number;
	tag_violent: number;
	tag_visual_novel: number;
	tag_voice_control: number;
	tag_voxel: number;
	tag_walking_simulator: number;
	tag_war: number;
	tag_wargame: number;
	tag_warhammer_40k: number;
	tag_web_publishing: number;
	tag_werewolves: number;
	tag_western: number;
	tag_word_game: number;
	tag_world_war_i: number;
	tag_world_war_ii: number;
	tag_wrestling: number;
	tag_zombies: number;
	tag_e_sports: number;
	website: string;
	support_url: string;
	support_email: string;
};

export interface HeadTableData {
	name: string;
	releaseDate: string;
	score: number;
};

export interface BodyTableData extends HeadTableData {
	id: number;
};

export interface HeadCell {
	id: keyof HeadTableData;
	label: string;
};

export type Order = "asc" | "desc";

export type PossibleFields =
	| "firstname"
	| "lastname"
	| "email"
	| "password"
	| "confirmPassword";

export type PossibleRules = "required" | "length" | "email";

export type Rule = {
	[index: string]: PossibleRules | string | number | undefined;
	rule: PossibleRules;
	message: string;
	min?: number;
	max?: number;
};

export type ErrorMessage = {
	[index in PossibleFields]: string;
};

export type Rules = GenericKeyObject<PossibleFields, Rule[]>;

export interface LoginFormInputs {
	email: string;
	password: string;
};

export interface RegisterFormInputs {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export interface CustomTableProps {
	classes: ClassNameMap;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof HeadTableData
	) => void;
	order: Order;
	orderBy: string;
};
