PGDMP     "    +    
        
    {            db_sb    15.3    15.2 P    }           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ~           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    18140    db_sb    DATABASE     �   CREATE DATABASE db_sb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';
    DROP DATABASE db_sb;
                postgres    false            �           0    0    SCHEMA public    ACL     T   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT CREATE ON SCHEMA public TO PUBLIC;
                   pg_database_owner    false    5            p           1247    18331    BowlingType    TYPE     O   CREATE TYPE public."BowlingType" AS ENUM (
    'Fast',
    'Spin',
    'NA'
);
     DROP TYPE public."BowlingType";
       public          postgres    false            R           1247    18142    MatchFormat    TYPE     N   CREATE TYPE public."MatchFormat" AS ENUM (
    'ODI',
    'T20',
    'IPL'
);
     DROP TYPE public."MatchFormat";
       public          postgres    false            U           1247    18150 
   PlayerType    TYPE     e   CREATE TYPE public."PlayerType" AS ENUM (
    'Batsman',
    'Bowler',
    'AllRounder',
    'NA'
);
    DROP TYPE public."PlayerType";
       public          postgres    false            �            1259    18157    Batting    TABLE     �  CREATE TABLE public."Batting" (
    id integer NOT NULL,
    "oppCountryId" text NOT NULL,
    run integer NOT NULL,
    four integer NOT NULL,
    six integer NOT NULL,
    "strikeRate" double precision NOT NULL,
    "matchDate" date NOT NULL,
    "matchFormat" public."MatchFormat" NOT NULL,
    "venueId" text NOT NULL,
    "userId" text NOT NULL,
    "playerId" text NOT NULL,
    "matchId" integer NOT NULL,
    "teamId" text NOT NULL
);
    DROP TABLE public."Batting";
       public         heap    postgres    false    850            �            1259    18162    Batting_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Batting_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Batting_id_seq";
       public          postgres    false    214            �           0    0    Batting_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Batting_id_seq" OWNED BY public."Batting".id;
          public          postgres    false    215            �            1259    18163    Bowling    TABLE     �  CREATE TABLE public."Bowling" (
    id integer NOT NULL,
    "oppCountryId" text NOT NULL,
    maiden integer NOT NULL,
    wicket integer NOT NULL,
    eco double precision NOT NULL,
    "matchDate" date NOT NULL,
    "matchFormat" public."MatchFormat" NOT NULL,
    "venueId" text NOT NULL,
    "userId" text NOT NULL,
    "playerId" text NOT NULL,
    "matchId" integer NOT NULL,
    "teamId" text NOT NULL
);
    DROP TABLE public."Bowling";
       public         heap    postgres    false    850            �            1259    18168    Bowling_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Bowling_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Bowling_id_seq";
       public          postgres    false    216            �           0    0    Bowling_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Bowling_id_seq" OWNED BY public."Bowling".id;
          public          postgres    false    217            �            1259    18169    Match    TABLE     4  CREATE TABLE public."Match" (
    id integer NOT NULL,
    "matchFormat" public."MatchFormat" NOT NULL,
    "teamAId" text NOT NULL,
    "teamBId" text NOT NULL,
    result text NOT NULL,
    "batFirst" text NOT NULL,
    "matchDate" date NOT NULL,
    "venueId" text NOT NULL,
    "userId" text NOT NULL
);
    DROP TABLE public."Match";
       public         heap    postgres    false    850            �            1259    18174    Match_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Match_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Match_id_seq";
       public          postgres    false    218            �           0    0    Match_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Match_id_seq" OWNED BY public."Match".id;
          public          postgres    false    219            �            1259    18175    Player    TABLE     �   CREATE TABLE public."Player" (
    "playerId" text NOT NULL,
    "playerName" text NOT NULL,
    "playerCountryId" text NOT NULL,
    "playerType" public."PlayerType",
    description text,
    "bowlingType" public."BowlingType"
);
    DROP TABLE public."Player";
       public         heap    postgres    false    880    853            �            1259    18180    Scores    TABLE     �   CREATE TABLE public."Scores" (
    id integer NOT NULL,
    "teamId" text NOT NULL,
    runs integer NOT NULL,
    wickets integer NOT NULL,
    "oppCountryId" text NOT NULL,
    "matchId" integer NOT NULL
);
    DROP TABLE public."Scores";
       public         heap    postgres    false            �            1259    18185    Scores_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Scores_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Scores_id_seq";
       public          postgres    false    221            �           0    0    Scores_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Scores_id_seq" OWNED BY public."Scores".id;
          public          postgres    false    222            �            1259    18186    Team    TABLE     �   CREATE TABLE public."Team" (
    id integer NOT NULL,
    "teamName" text NOT NULL,
    "teamId" text NOT NULL,
    "userId" text
);
    DROP TABLE public."Team";
       public         heap    postgres    false            �            1259    18191    Team_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Team_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Team_id_seq";
       public          postgres    false    223            �           0    0    Team_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Team_id_seq" OWNED BY public."Team".id;
          public          postgres    false    224            �            1259    18192    User    TABLE     �  CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text NOT NULL,
    "isActive" boolean DEFAULT false NOT NULL,
    "verifyToken" text NOT NULL,
    image text,
    "hashedPassword" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "loginId" text
);
    DROP TABLE public."User";
       public         heap    postgres    false            �            1259    18199    Venue    TABLE     �   CREATE TABLE public."Venue" (
    id integer NOT NULL,
    "venueId" text NOT NULL,
    "venueName" text NOT NULL,
    "venueCountryId" text,
    "userId" text NOT NULL
);
    DROP TABLE public."Venue";
       public         heap    postgres    false            �            1259    18204    Venue_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Venue_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Venue_id_seq";
       public          postgres    false    226            �           0    0    Venue_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Venue_id_seq" OWNED BY public."Venue".id;
          public          postgres    false    227            �           2604    18205 
   Batting id    DEFAULT     l   ALTER TABLE ONLY public."Batting" ALTER COLUMN id SET DEFAULT nextval('public."Batting_id_seq"'::regclass);
 ;   ALTER TABLE public."Batting" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214            �           2604    18206 
   Bowling id    DEFAULT     l   ALTER TABLE ONLY public."Bowling" ALTER COLUMN id SET DEFAULT nextval('public."Bowling_id_seq"'::regclass);
 ;   ALTER TABLE public."Bowling" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216            �           2604    18207    Match id    DEFAULT     h   ALTER TABLE ONLY public."Match" ALTER COLUMN id SET DEFAULT nextval('public."Match_id_seq"'::regclass);
 9   ALTER TABLE public."Match" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218            �           2604    18208 	   Scores id    DEFAULT     j   ALTER TABLE ONLY public."Scores" ALTER COLUMN id SET DEFAULT nextval('public."Scores_id_seq"'::regclass);
 :   ALTER TABLE public."Scores" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221            �           2604    18209    Team id    DEFAULT     f   ALTER TABLE ONLY public."Team" ALTER COLUMN id SET DEFAULT nextval('public."Team_id_seq"'::regclass);
 8   ALTER TABLE public."Team" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223            �           2604    18210    Venue id    DEFAULT     h   ALTER TABLE ONLY public."Venue" ALTER COLUMN id SET DEFAULT nextval('public."Venue_id_seq"'::regclass);
 9   ALTER TABLE public."Venue" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    226            m          0    18157    Batting 
   TABLE DATA           �   COPY public."Batting" (id, "oppCountryId", run, four, six, "strikeRate", "matchDate", "matchFormat", "venueId", "userId", "playerId", "matchId", "teamId") FROM stdin;
    public          postgres    false    214   �c       o          0    18163    Bowling 
   TABLE DATA           �   COPY public."Bowling" (id, "oppCountryId", maiden, wicket, eco, "matchDate", "matchFormat", "venueId", "userId", "playerId", "matchId", "teamId") FROM stdin;
    public          postgres    false    216   7�       q          0    18169    Match 
   TABLE DATA           �   COPY public."Match" (id, "matchFormat", "teamAId", "teamBId", result, "batFirst", "matchDate", "venueId", "userId") FROM stdin;
    public          postgres    false    218   �       s          0    18175    Player 
   TABLE DATA           y   COPY public."Player" ("playerId", "playerName", "playerCountryId", "playerType", description, "bowlingType") FROM stdin;
    public          postgres    false    220   �       t          0    18180    Scores 
   TABLE DATA           Z   COPY public."Scores" (id, "teamId", runs, wickets, "oppCountryId", "matchId") FROM stdin;
    public          postgres    false    221   �       v          0    18186    Team 
   TABLE DATA           D   COPY public."Team" (id, "teamName", "teamId", "userId") FROM stdin;
    public          postgres    false    223   �       x          0    18192    User 
   TABLE DATA           �   COPY public."User" (id, name, email, "isActive", "verifyToken", image, "hashedPassword", "createdAt", "updatedAt", "loginId") FROM stdin;
    public          postgres    false    225   �       y          0    18199    Venue 
   TABLE DATA           Y   COPY public."Venue" (id, "venueId", "venueName", "venueCountryId", "userId") FROM stdin;
    public          postgres    false    226   ԩ       �           0    0    Batting_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Batting_id_seq"', 1423, true);
          public          postgres    false    215            �           0    0    Bowling_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Bowling_id_seq"', 942, true);
          public          postgres    false    217            �           0    0    Match_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Match_id_seq"', 83, true);
          public          postgres    false    219            �           0    0    Scores_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Scores_id_seq"', 82, true);
          public          postgres    false    222            �           0    0    Team_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Team_id_seq"', 24, true);
          public          postgres    false    224            �           0    0    Venue_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Venue_id_seq"', 25, true);
          public          postgres    false    227            �           2606    18212    Batting Batting_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_pkey";
       public            postgres    false    214            �           2606    18214    Bowling Bowling_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_pkey";
       public            postgres    false    216            �           2606    18216    Match Match_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_pkey";
       public            postgres    false    218            �           2606    18218    Player Player_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Player"
    ADD CONSTRAINT "Player_pkey" PRIMARY KEY ("playerId");
 @   ALTER TABLE ONLY public."Player" DROP CONSTRAINT "Player_pkey";
       public            postgres    false    220            �           2606    18220    Scores Scores_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Scores"
    ADD CONSTRAINT "Scores_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Scores" DROP CONSTRAINT "Scores_pkey";
       public            postgres    false    221            �           2606    18222    Team Team_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Team" DROP CONSTRAINT "Team_pkey";
       public            postgres    false    223            �           2606    18224    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    225            �           2606    18226    Venue Venue_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Venue"
    ADD CONSTRAINT "Venue_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Venue" DROP CONSTRAINT "Venue_pkey";
       public            postgres    false    226            �           1259    18227    Player_playerId_key    INDEX     W   CREATE UNIQUE INDEX "Player_playerId_key" ON public."Player" USING btree ("playerId");
 )   DROP INDEX public."Player_playerId_key";
       public            postgres    false    220            �           1259    18228    Team_teamId_key    INDEX     O   CREATE UNIQUE INDEX "Team_teamId_key" ON public."Team" USING btree ("teamId");
 %   DROP INDEX public."Team_teamId_key";
       public            postgres    false    223            �           1259    18229    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public            postgres    false    225            �           1259    18230    User_verifyToken_key    INDEX     Y   CREATE UNIQUE INDEX "User_verifyToken_key" ON public."User" USING btree ("verifyToken");
 *   DROP INDEX public."User_verifyToken_key";
       public            postgres    false    225            �           1259    18231    Venue_venueId_key    INDEX     S   CREATE UNIQUE INDEX "Venue_venueId_key" ON public."Venue" USING btree ("venueId");
 '   DROP INDEX public."Venue_venueId_key";
       public            postgres    false    226            �           2606    18232    Batting Batting_matchId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES public."Match"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_matchId_fkey";
       public          postgres    false    214    3516    218            �           2606    18237    Batting Batting_playerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES public."Player"("playerId") ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_playerId_fkey";
       public          postgres    false    214    3518    220            �           2606    18242    Batting Batting_teamId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_teamId_fkey";
       public          postgres    false    214    3524    223            �           2606    18247    Batting Batting_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_userId_fkey";
       public          postgres    false    214    3527    225            �           2606    18252    Batting Batting_venueId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"("venueId") ON UPDATE CASCADE ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_venueId_fkey";
       public          postgres    false    214    3531    226            �           2606    18257    Bowling Bowling_matchId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES public."Match"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_matchId_fkey";
       public          postgres    false    216    3516    218            �           2606    18262    Bowling Bowling_playerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES public."Player"("playerId") ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_playerId_fkey";
       public          postgres    false    216    3518    220            �           2606    18267    Bowling Bowling_teamId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_teamId_fkey";
       public          postgres    false    216    3524    223            �           2606    18272    Bowling Bowling_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_userId_fkey";
       public          postgres    false    225    216    3527            �           2606    18277    Bowling Bowling_venueId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"("venueId") ON UPDATE CASCADE ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_venueId_fkey";
       public          postgres    false    226    3531    216            �           2606    18282    Match Match_result_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_result_fkey" FOREIGN KEY (result) REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_result_fkey";
       public          postgres    false    223    3524    218            �           2606    18287    Match Match_teamAId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_teamAId_fkey" FOREIGN KEY ("teamAId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_teamAId_fkey";
       public          postgres    false    223    218    3524            �           2606    18292    Match Match_teamBId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_teamBId_fkey" FOREIGN KEY ("teamBId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_teamBId_fkey";
       public          postgres    false    218    223    3524            �           2606    18297    Match Match_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_userId_fkey";
       public          postgres    false    225    218    3527            �           2606    18302    Match Match_venueId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"("venueId") ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_venueId_fkey";
       public          postgres    false    3531    226    218            �           2606    18307    Scores Scores_matchId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Scores"
    ADD CONSTRAINT "Scores_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES public."Match"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY public."Scores" DROP CONSTRAINT "Scores_matchId_fkey";
       public          postgres    false    221    3516    218            �           2606    18312    Scores Scores_teamId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Scores"
    ADD CONSTRAINT "Scores_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public."Scores" DROP CONSTRAINT "Scores_teamId_fkey";
       public          postgres    false    223    221    3524            �           2606    18317    Team Team_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 C   ALTER TABLE ONLY public."Team" DROP CONSTRAINT "Team_userId_fkey";
       public          postgres    false    225    3527    223            �           2606    18322    Venue Venue_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Venue"
    ADD CONSTRAINT "Venue_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."Venue" DROP CONSTRAINT "Venue_userId_fkey";
       public          postgres    false    226    3527    225            m      x��]Y��6v~��#y� ��G��N'/�.Tu�uUwkߥ�U�>�<\%�4�7����'���7�^m~���7��t�!=i8�Ж��	�������Ͱ?���i�m����?�z�-�s����ڎN=n���t�����4lz���o��$y������!]�m�x:���t<h�7D�i���tޏ���4\o{��l��Lh�nCH�Q��u�6ݶ�~ˣ�������e�ḽ�GD�ΜZX�X�X�N�۾��xg�v/�]��U�@���=O���~x9���|�V�u��r�g��?�F�D��}g�.�FT1���:ܷ���8�Ks�ΐ�뚮�����7F<�rI$rI�PU�����~�>����MҢl�Mϫ��q܍��98Ap�]͉�����������W�kU����ϻ�}v�kPY�Yt}xBh�W1�e?��׶7��� �Y}h��	s�_��ᶝ�QD�G���R����g�r�2C�$M����x��?���1���v7�=�4��� �����D5�/Ǿ��4n����=n��� �Z���>���������U�y|� ���6�b�Q�Q�y?N������Ð�[�l�Fn��M+���:��k�s�(��iZ}w���q�}����q�,�)8y*2�؇�e�]�^��K�]��hkO�a�0�r�n�n��! �`�	�����Z�t=��+,}��lZ^�����D�_q�aڍڴ_��(����78��qUk`��M�J��l�}?�L�5�Ѧ3�8��r�o���q�`���(����<w�63جu��T9v��8�O�9d*ˑ��[��8��sD�><*�0�P΀�Fp�p�o~�jh-�4ѡ��>=�^LّR�6V)@s#KI1p'!�Oc�8մ�����~:o�ˤ���Y�В7����xϗ����q���3�ײ�w���84p��W����Ÿ��<n߀����ٞY�6eZǑ���n���n�b���]�ɡ��3�P��3nup��$��b��R��\�E��p16\X�L���V�׆�RT@!T9bP���~F
\��
Q[9�M���<���UwGӹ��4��$�%�#�}:mo��}��5I�c&Y�\��x����8�=&�c�� i�"��חG$���~�˯����m��E����2�G���ȳ`�,��P)�X�|�D�9��@s��S�j��N��6��/P�5�o��8�C�t��7sl8. ��A�gn��%����hx>�p��9�KC�j�|�B��tDQz%9U�%�f�)J!�W`�7"�������^�ewy�y�PƮǬoh_u�wsλ-��x|����{���tځ֒�z��/>�?�׷1|��/P�6���������7����Q���W���"�m}��=��ew,�P���9�	N<^�����cu&	H�d�U����:l��n Iҿ��Q5�^0��Ob��;
��1U0d�c?�n��q�����#�N�j���%����NsGm,��/��; �s��bO���8���2��52��AFǉ��\�/���c8��Z +jՒ�y��ln���M��Q�3�6��V�>��]��lo� :[���s���;��C;{�
qQ����+8s��n{�>�b���d�ֱB&&'�6<L��0�ǀ,ro$�"M}es��~ 7����B�~��7}�O��LV��[�q�5��&������y;�<�fj�4�E��p^�������i� ��G?�o�m
lf�pF���ʦ��@����r�v���_��%�TZA쯏󘛝2鹟H+�1lQU�&�[3V��I� 9PiH���k��6�8N^i��5�f<u�q��~�i�����(|��:P[C��Ɩ��j� քro���D P[��
֤���qt���b�y��%�N�����n�j�Am����:D�X]��u������Zy�+�H0�4?�:w�jl��N'�;�*%���@dz�	dQXУ-�N��XD�IGJ���YQ���Ŝ�\5�Ū]czr��2^��n3��r2n+b\�j��"���
O:�}�$�!c��U��N0n�ӷ������a�m��tU\�z��������y�^���7M��<݂��k����K���}�'?�@�hX����<���?G2;��y�e�xGò=M��#b=y`}���U� �����r>���t��{�x�K{sh0��wW��p{�aܚO�V�"�<�u����v?vNڢ�C^�QG)J�G��xO�A�����L^�
)RG�XC�� �[W�$+ m�`w����%	bDO�q��L_�+�^g(C�b�V���5�#�}8��ӭJ��<�����r�`Y�M?�/�0
�®��X��*�))�:�����H=���T�cTv#cr�o�"����=h�i��@�5BY*�iF*�����BDS����N�\u�Wm���v�g�ݸ(�/����M�P{�q�L>/'���_�����q��;k���cb
8����%��<2��M��a����r%��ഝ�ůJE=��/��>��쟎��偢0A7�m�M��YŅY������.%i7i~R���3v�0ɫ�g�I��LO�Jl�29ʍ���1q�,)�G%`lSU'��
�N�&-��I�5��t�p�O�+�5�
<JgZhű��H���{��7Ty\��
��o�M��`[T�����7pp~~�8`�=[�#��$�$s$?��9��).u�i�r'aoϗ�};����nX@nl ��c�&���+?�EJ�=�u&OG�"���?l�nڝ���y�EQ������t��p֖��v�و��K�'c~AxvW�5X���8j���A>zڬjzR�5roZ�ty(J%�*�$�����}���t�6h'����p��}K�(|!��QZ-	�&�0�� �ո�F2��O�Dj�E�K�ҾT�Y�I~�aR�4���`��a�tL0�t�DTj�2%��'�&�e�hC�FT�Ȕ!�b?�)���lK��Z}u�� ��H!SACL�U�g��8n�8��	#�vV����.3q�<�ac�e��
xavf�b#j8��ԮTt���C0�՜���]��w�j���j:>񍶆�i���e��}���v�Ҥ���YX]-��q���)v��;<n�q�u��W���i��]%�j(�AtK����~|�y��>�*�����U�ɟ����j�°���_(��̤;#��e��d������DL)k�a���{�G%hl���U�,�e�M �rJMc����X܇��]�I�b����}�+t�J��z~-C�\�3��ܲ�&	F�T1j
u�.@�7�:�#�oR}$�V+<.ӗ���ΐ�H굜N�r�ʩ)�Nm���+(��	��D9%%�T��Ϧ �Y�=����+�Z�^m��(I��|t]<�Wt�A'A~���\���Ujj:jTP�Z%&��F�Q��X�y2��At\���"���N
�^��t��a&������iy��͗Ar��(3��5-�OgQ^P�=��PbĳMˊ��)�����嗀�"�d��x>�/oyM�\ I�N������Qè�h|�莴�m�F^�9���L��F������,A�w�����m�H�$�΄]�)�� tGW�?rqW])���\��'N]z�#�X�G��Ve0c�>nJ�f́y��v�x��'�t���ٙ���v�O:W�1�{M���Z}B\�H7P""�ݪ�d\*+�س����IUȫ)�$Y��˖�5�8��`lN�{%-��\�{peT��r����2�������3Qg�#<n�#]E�q1�<����Q�p�|WCb�L���H�>8����'3m3+I¤��s�{�m�i�
�<`�����f,�J"&�q�ƹgv<�G-"�1��H5ms��˿;�{/��C�M?���TH���z�$0C�f�6�׫;ۖ����LW�¸LOۏ�����p��    �A@t+����vVN�&�щ���ya^h(j�r*Q2���Pk�_3��.����w�ѿ�E�$�;���W�H�� �	n�V����-N/a�t�&V��s�چ�$ �>i(��O�aH�o���(N*P�p|a��5�O)cl��IOk4%A{�!�T*�^����z�<�;a�B���*�q�H�ۇ	^��%:�%�I��{>e�Qs��|@5�;p�MVI�R6�z1�x�A�w=� ��o���UU
~�8)勒�����F��;«4���:�O[l�:�
� :�8@Ί�.i˪g��I��xΎ9jR�qb�����}�֒\qIgz����H}���[�ҭ{K��G���a�z�++Ly22L���)��� ��5��ɮ��i���C�#(}�%�Gܗ���ĵi��Yl��蟦�<���C����yȇ����u��i�70kMd1h����p��Y�B�	�0=��AzS���v�Lय�#�e���/�g����&�l�J�Q��"�F^Ta88D�s�`3��r��JE����D�BF�x�O�7���$�5��7/�fJGR2w���w�p~�횾/ō��x�Y��X!Uҥ��ގ� l��(Q�R|r=�-Pe.��sQl=쓼`t<g��dN���3ag=��j���w.�r�)(�̸�m2˙+��a�!�_��7�,�D�2hl{�@�Eb��]����W"��і�{r���&���l�ql&����*���(���5&,ƭBqiS��̳2n>���|q��m�N��9%]�Y��U46}2)��)�>3�$,$M�r�0[���ak��ƥ���0��|�[+�;�G&n�����ֲ ��"CVC��D�j���cg��]Q���,�s������2;��$����Eڝ�S����{a��ZlI9�7X�'�ԅ^��"�E�L6ߤ�}�B�%t����CO*�Լ:w�v�e�?ӓQ�F�6k2j^2�dL�8�3���I��Y�M��fԱL&Z6"���,r����H����:e�}�<�/�Dǝ���)�h���[�� _���}{�Ṏ�$�&�������(z�����a����*�!��T/"��Y������h5$uK�0	����gV�K�vBK`[>*P� �=l�:��sSl�GRg>�R6Nu�>[
^���u��5>��&q���j�d��[��s�R�y�"�K�1�c��6[:Y�������c����l�?�୛����(��Mr���s�LP�<O����P��Pɷ*D���e�L
�po!���3oX���UȵI/w�v��%�nXWAι=�k���K�M��=�r�I`3c��T@�4m���V2?�A�~�G�e#�#6�����t�����p��5�΅��}�~=��|�e�¿�)D9�Z�\�;+/[��h;f�̖w�
�c�(s�ADg7
��d��vzsn
ٶ���Ri�嫽��Ǜ.+�e=9Ȃk�l�����JR��j)j�*%�|T��
��&��3Gi�@4�K�. ���={���x�2 �YtXv��9|i�`�!��fAl1_�4P/qR9�,���Zr�&;!tߦޏ�T⯴t��W��q�CO�'Ok��ŉњ{LSX��y�.��]Tx7���5J�[5�6��3tT5	��;.�[�d�|�m���oV��I��_]�k����,ؕ�ȃ��V�l�^�3{�a�|��ȱy�3c�}�Y�[�?�$6=�u+��J�������,ɛ�\������8�"`��kc'�Iv���#+SA����~z�ڔ�+�]K���E�ׂG(,*0n�N��;W�n�	�m 42-ğ� �tn��m�D��d�c[��53���/B
�͉8���z2��n�*��kl��F����Y� �+�f!M_�o�Ԯ�R�1���b�.�@/�����>C5�l���YO���26	�K�nV]	��4
nfF��/6�����IKZϗd��B�����XX�]�cP�f�������K�4�Z3�Z?^j��0eL؎�SET�J��˲�����d�Ń�u�K�:Ιx	!�����������O=8X�1�:�@�U{��P"*څ�v�,�T�^:������8�@y�bLktq�_���Zɕ����N�a	���T�E_����aBXBb���E��%�]I�t�zR��j�Σ����;��T�1� �;�(�6��e�d8z�ybQ�Sv�ibџgW�B�s���ڃ�hw�a�yq�#�xW?�,k�%J�yd�I�Kٹ����� n٧�����(�ռ7/=.u'M�B�/�O�K�]q�V��Dϥ��^��%��܌�����X�SG�w��
\ks��q�"BRA�d3@�d^������I��j!Y���G{:�G�Ri)!�ۤC�WnBT�����9�$*3��	��U����c���;�y���?�I	3��>Y@9�n+L�ƭ.e��n� nZ��T�`�ge<��/�t�2W�,�|VZ�]R��o-�8H�S	�������q���3�3�Yd�5+3$ �UL�5�#���f6�����2qe���J�����+⳼2{A)�����5��G��?�/��);L��lMBs�CVXn�>CT�(���97awcS��4�	��?���G�6���DҖ�|���1 s[�7�A�丠8��I�yU�O�����q�-E�@@�.��<u7�z�n)*YѲ�g�*[�=��D�o�R|�0�9+s���g���Ӿ�p���#�v&n���@DS��B�3ɛ�K�6la��� �R�Ř^������V/V�)*����YF�f�t]G�j9o:���� Ԯ�aU���T�TOJKٟ���{�2,�Y�?}
�0�3����� ��<�Ⱦֵ\����0�}�c�M����:w����8Ft6��;�+z�Q�u�N�B�F�T�WE�O0�+�{rӵ��L~�d��md�f	�"We��6��ܓ�u�wy�؇��-���F.�r���
�}�R��^u]�a��!�x_o��[�F{�`�bz�l��Y�~ZC�Ռa�OnW>���|Z�f�D�:�:��;(i�SMiR6���4�b�w�R���&��f-�x#"�`�n�r�y!
ߧ"��vY�[�|쨤�a��j�2�P\���Z�HfZF��}����I�#cU��)Zy}��a:%�}`g�N�:Y)�q�]�l����"��HB�zJ{�83�s�c����h ���-z�h��hczPv �u�����?��]&�f}�)�*eR��Ğ��p��:V��;��֋,c$�βɜ�~}����}谘/)Xw}�[j�`�e �ҍɚ���׶���h�jJ��K[���˳��1#�ޔM����py6׀���Q��5�p}�3׷R��7؇7zy��KL�8^���4�h�H_�EJ��e�����$����a��\��(�Q��:���.|�4
	����Jp��>�]5
)np�l'�'+��mh�(�Y���[�=.a2P���n��E;��hη$�J��:++�\k��*Ƌ*��(Q���r���pK�:�Y�;�J�����3����:�J�k+�y�@���5���Ԉ���ʬ�:lz�������#����D� ,<�"Ł��9R��h�s	�	�+��m���mA�ә�"�|�{���=�љ��y9;۶%#+��tn^ּKS-�	�V��|��}d^�bU7��&ww�v��ʆ�c���m�E� [}��^y�s����(���4���}6L+�^6���q_�WT�%�5���A2��;�(��9ɩZ}>2�4F�{��?�b�؅\�|񂉝/��Y@ިr%8+*9	�ؑ&������X��B���g|��%H� ]�HV�!ߩ�xo�=.�=K�j��2��[
��-�Ba�iTi'���Ԯ�P��ы�ą� M��.w2��ʆ�P:��'�Yp�T���aG��$����0v��E��&n��E^��b�;�)q,�M-h�V'w�7p"
�e�
�ϋ?�>��ǁ(, �  ��
�I��¹19�CK�̇+"���v��p�Z�'�=ED�_1s��B�>��Z�� ����TL4���c�����k��bq/Ng��`*~@��a�[��Yx����^���w�)�3i�2�'���|g��2}s�'���8�
39*!K<���m��~JF�K�gMA������\4FzpӉD���X��ă7�.���Ye�D�C�?�is��,�H#�d?m��;�D�K>xx�����>#p;��Z�dj��c�Y+�W���=}����?;6.3��a�P�B��g`��$q��'6�p�*E��;�x�GVԓڮn��S���}R�9���������F�@��/����A�~�ȫI�!PG���&oP�~���bCf��ܱ�ldWm-g.�����Е0�_��i��ϗ)�f�l� 3�X;�{m�x��2���O��c��54�}�ICc�&���`~D_����6';�y�5)��?�Z&��O���5�]��t���,� (2�]��^���6���k�����o+�8��ID�
�?���}��۰J��|�7yu���%ۏo[]R�Gj�;}¢����M��s��(����RY�4���/���O?���FA��      o      x���K����ϥ�2�d>H�Q{Æv��{,P`wewewV��j���d0�,H$�C>>G#��b�b��/�T�z�7uU7�1��7���n��8�Ճ�o�����y���?�����8���e�v�>o��t�������ŲM��M	�yN��Q}�Ƀ�7 �J����x ��rU�G�
�l��Wu�=ގ��t�T�zh˨j���wu��<����5@A!%Ǧ._��u�p;��A�AL 7V\P��{T�����."3��o+"�u�mw�?G/r�E.�^���x��W�EZ�l�Eƫ���Y�^�~xQ^Z��n[�p��i?_w?�0�y��\�߶Hd���^�ܳ����:\M��/��yzUW���Up�@A��v�ʌ�������-�F!�Q<3��
4 ��8�%�.�ISAF��VV��u>4�['��h��,h��
(U=����8�e���,Ы��>���Y=V�+�%Jx@�o�=���=�-���@Zȝb%*|�@���YM���<\߇���'р޾�:P��eޝu�P^�2�4xu�x;>��;��ƙo�u�u�/�^�l	�,���U��������D6���i�8b;�eM6v�_�a�4��o���X�X^�V���i�^*�wT��/��Uh����lh�t8hoD:U���&-p��DV��x�]������((�����~�X1s��}�8f�n�{d� �ӳ�n��O/�۴�� ���p�w�|��&7$�oJ��y�槅����p~<޻���t�:������&���^��uiw�0쉰˟�����zX:7�n�O�0���q� ~�G8��:���fնH�i~�| �����WN:9�9Vu����}�lb�#3K��o��s��]u�r�ێ۠2��7�{9��&vϣNq��X]����78���u>LD�J+���C�� ǋ�Qb�-;�� �.�b��/�X�M�`�'�����t��������\��6
.�T,	��Yݞ<��H�i�Le�O�����8DnSY��@�����~��.��c��j�E��v�<�Ff(S���� w����?m���`�#�x�ᇆ�� m-T�W��m o����S;K��`�����Fu9�{���t
��N]_�ڟO�*�Z��㼸�4z^����_L���NCj;b�� '[N=w",�e( [��_ ��CV	:ܮL��� !_=<�:1r���<1MDu~�s�\��4z=�-�;sE��˫NZL4ZN���f�A�����^��e~�;���(�����x�\���~;��0举Q(��'�;�O� ���4n�w��s'h��h�ɪ��6���ͯ��Wɭ��vzw�_}e����+���'/J�&��+��B~��+���&��	??N�93ɯ���.7�ɂr9���1�/��O�Sc �Ą�&+ �4x��NQ��s%P�n�-���7�""�w$r�AhG$�v2yg��cV� �&1�A�ԦHZ�V��;�6ՖX�³^N뽪+�b~wR#�g�-K�[��wVIR\���.��V��vޚ���Q9W��h�E�$��ަE~5�`���3\Ԡ,�~~S&/���K�n�t%�(�B��H��X�ZM�B!͂�skrt���Ɇs��LQ���nӤ�����/θ�`N��������֦��lV11�g�u$_������e���G ��'p[��e���Z���DiM�Ɩt�-�F�}'-G-�o�NcU ��.���{�����u	p��?��g��ޝ�*�u���;����<�Y�����4��4����O�0nк>�N9���\���&q�~��4�U��a�!�\�ؕ���o�0�j��U�cL<�t�|��+l���O���t��o[F�L�n`��C�����+�uբ
Q�QWW��b�#�� jqdi�z}���0iyM�*0��+���LЍ�����&��=��MdR�w.w;���O�S�.U�u`,D�#��42<�ҹ��Z4�n���j�����DYz�$:n8����!�0���AzF^0�d����p��k�Ds����²�"���*E����7�~�M��_�J��Ң��4��h�"ߞ�5�T�;c2w�ڰT����m�5������Z�nu��=@b4����1����"��Z���u�X-+ B`[BҺ)�j��)��:���T��K&�+�����v9l����x����Á��$�X�ݕt��a��J���Ƈ��mz�Rg��ɪ7�Q\]nz��e��f_�7�pu�X�p�e~��&>V5��S�E�f�4%N�ƿ@��Ÿ�Em	4^�r�[y�eE�.���FЫN}���20.J�T�r9vE`�I��S����4Zt����.����7n���' d�+VM�>opە��t3̖��Y�+�g��t��bu�������X��آ��"k`�V���)!�-�-��6i&F��U�	$3
g�\[�}�p�mޭDW��]rK�g�~�.�$�O�]M�wO�<�����j~��^@5=�*��5e��:�b��c%ؽ���~(�x�o��p�Dwf�L+�.�E�� �,߼��(g=�C�7J.�����$1����t`v���M�=��e�D`�˾��Ϡ��|��f/�:n��O�IT��6$'J$^��]�@�:>x�BȨY]���C�����>�z���,yf�Y���8_�P�{aR�(��~�!�$T��h^�j�q��rx�[/M3Vd�+�m"�M����Z�K	��@��fC�\��U�\��'�Y1An뗟X�-Dő�/N�g����m�w���q�&��[�X���6�����{,��ȕj�wB���ʿ�%iG����ܼ��e�����s�vy \A��}k�R��Qpr�'��]�pw��?6�Xx��RH۴�i���D>�+ު�e���3
�@�:��-��grtd��K��ã���\�,�1�ݿ��ʤ:ͱ ��<��-WΗ�x��;�P��+�~{��Pu������p�H���@� |۰�ǅȴ�����e���2Y�!Nе���x��>U�ө�U�#�c�W{i�ߚ��K�U�?y���]����\��E7�i|JUE���h������o�pbf��o?��=�.�t��U+�� �PrT�N��n{�Z,P�7]�8D���d=f�ϪS�w�@�6�̈́�|iI�e&0L$[R����x�+���9�7��-����f�%Iv�|%Mg��Uh�uA>\�N�W�
�3�w0@1r�}� %�I��L���\����G[��a/������n�@ܬpʕ�?/?���Vx64 �G�`�{=�CO�����E��i���>XW�Ro�W8R���ߊ��F
�L0A"��s�'L��;�����5D�c�UXVt���U½�c��ɾcV�V�^i�m�ǹ4��}b�,z��#@�W��`y���=��g@�H��/��g@�CDr��5�e>2�0�rB��G�Ϗ��5k��X��ҧ@n���&fÎi�#f���Cc��[�BB�k̏Z�R5K�n��d���5٢�,�>(`9�����0�qTa���`d	]�+�k���
�W�8��JDC��t�����"G'
�N'��1�E�l�uL��dj4z��#pk��
/^�C�5�c��%�sD�n~�R��EDw��_`i������7B9V8e��H�_�DVN��ͦ�EM?�1�/��O�u�<�{N��z����xٗI.��I�ҽ�ە5$��v��6�/��Ab����N�[�D8��:��Ke�N�퀠*z�d.������W�t��q+�q�o ��>�C3��3D�g�񄓵��z�8�[�w�(����W���ԩ����t��o��<�5��u>6�#����)��:�MgfCXv���!�hĀºnuT��b����ս�kKd�:LNV�-�I�����]H)�t�Z�3� *�2i{��ّ�"/�3�9�k06QV��Wڶģb��.�JR�d�`�5n �  ������p�0�o��+Z������ky�f؜0_呼�:7v��Z4V�η�D�H?���Sn�"5�G(i	2l�8�$��m�j��f{�Y�^������O��N��Xc�j�th42:iRtu�y�9���%��J=i*!�]дK�)������g�zo��3k���l�q��Л��㑆^	��8�0�|)*�&DMz�9���a	̾�WkX;ړ��T����M{X��u��ZL�����}q�	o�Dl�m����~-(Y�-�Z�WqS�Փ�ܾ&Il�^��/�qԩ�D���m�����Z%�؃W�{F�n9Q��wF�ɦU����uΙUK�,e�Zi�嬪G�Jj�i���)ԭ@�j�J��w��V��K�[n�QtfKw��l0,v�Ňbu������$�����.��0�y�m���~xR5�.?p��3w�
<)Nǣ��N�R&���낇�K��Eb���#\��c�=iP�MŮ���W���$���6R}YK��T��&$�w�Tg����4�}�hԖ��nM���}>��$3��5P�����p�q��i($�B.7m���f�I����՗߈��
Ĥ�.F(�+8����5�q��ru������L[��9���1�����ئ�γQ\��ƃ�2��Xi��}(��3����zq�����T�?QЕ� ��;���w����6\m@=p��6�s��������;D�v<`rf�>j��Uo;�9���#M'���}�
9�^8����q嫺� ����:=�����D`�w����<�W�d��AU�ө�գ��Bd�OP���2^<��B3��L8��6�9^�.�}U'���ڮ����`�~* ��҈qؽz8-��#�`V|�^�7��1=h����> ���r����[�!����p�¿5L˼r�똺{�ʞG��;M����iXC����O����RP      q   �  x���]o�0���q)Z�t�#f[�v��
Q�f�~m�ĤԈ�{��<�6[�����T��7q݉!�Ui�7<A۲9_�hG�x5�����<'��@�XO����)~�&F����oU����6<7hG��m�z���К(LQ���O_T�P\�^B��<�����NM��
X,�H%u�;�Ŋ"t�_o���#+�R�P�����k���kD�@��� ��$-3���<�>|;�T�������cX�d C��(*�mQ7g#��Ìcb�3ҝ�h�w�f�a��VхO<�a.�]�
���R�,�	�,D2ڐC�0B�6�h	���R�$�^yi�\�%E�i��ah��um*��Z¤xwk*�*���k�x�	FW�E��1[����3Đ)AW@x2B2|���
��J�O�ቨ��zO�A~�#/2�秚W����8����I�yr�82�      s   �	  x�uXms�:���
}����Hh����i3��͂��T���럳+Йf�gY��j_����efG��A���F���Y�����1��L���YN�J�.s�))4���PO&�Mk��2��j.@��3b)]c<-�f�Ӻ�j**�<P%C��VV�{�O�FX@D�W۴����&����MNowu�������jͲ+KW5�Z}�ˉeT���F��(M~u�j��d���P�F�3�'�_����rAfAۮ$��@�E��jg͖x�`��il�^E����A�{�p �̲OC�T#F|���ܺ*�en
O��<�
=��y&�W:�O�7� 1Ç���P�L�$fk�gfY��`�z��{����i��h�&��SSZ��6�855�_#J����`��q�-B=�01�xr�ڻ&�S����翬��՘�"`�sx���U�S���$��ж�ʚ찤��f*���xh�Q�#����� �c�$�m]"A[lS��%SġELɏ�����9�r�CK1���(IN���=H�N�KU˥ꜻ�"Y�+MSwm� xs���rbl՚E�����yh�vȞ�뎽�,X9���6�!X��@�d����������e��o��_c�e�qĴ,l�+*u�X�N81n���*3�Z[�v��ju��@�Z�mkl�>�5j�H�Qb���K��6���G���n�T���.t�Iҳ3N�}�FE⪴���_��1LLCm}�:U�҆2[��6e2��#��U#Q��|P�e��T��ˤӣ&�юky�e��?���nM��Yn�+��n�m�j��F11AE
$LR�G���ȉQY[�Dީ)Kz)1X��{W��@�G���z���d ���n�-���hƣ#H�h�u�S�q�~uhԽ��bԼ�&�+*�]n������o03D D=b11)kԠ�2�aǥ���5�ĸ�.�5�z5��	H�h�*���� ������U�d��6SO=�#��gs����ϕ���'���r��lW�e��r9�o�yG�+�[~��bE�@݊c
���bb�Ru@,��^� ����h6�]�
K�F=�����6%r+���Pư#5�~�Z�8k��m��y	�j�Goa�#J���.Fj�YN��&��w��9bl�qjl�}�=�`����*� ��U�l��?����_��f���T�-���\�e�7�fk,VG����C֣(_R�%�e�U�S�\j���������4��r��)�[tv��� 5��HT��gUB}|W������e=91���L,�)��40H���gۢCN�h��	���Ui�����F0�j(��,��Pӗ�p1QT#�S�`�S������B����5q��<@Dv8��-3�U�����-��I��w.����� SP�*,����:=�c80A�3��S�$<��ogU�2�d�	[�R㓎y[�%c�牰q-nG6R%�Lbv��/�}!#JN�-��ܚF#��^(g �lkX��4��:�J�k<̼��I`b��f��:�:����$�bE�N	w괁��:˝z���"�eC���C�Q�( 4��#L�+�t�0���Q =�J7,]�B��C���X��;����5�': �c���rjtR���/��m���8rSWdP�v�G� �=d1�Lf��_ǕI����l�˵���k�/"�����U�!�w�g��t6�5��x�����������Ŝ�[��:��p]�y�ZwU�(�
^o�y5y�2A\���@\\�ك+l����?Dq=�|������x�8�<�=��C9�@?1��n^����~����r�!*��^!Ǟ~�-�����+�z�$O�E��#H��a̅�U<�����Js��i�'F�n�.��쩢�;��#��qlm��w�o�=���n��6�.̰��B;��tP�F]�$�
������P�l�GJ�k�57��]���D����Quk�Q�1�"_��wb97��Az
����8���7��eo��ro*nH��_�Y���cs[�=���G�7w�t�KL��
���A�A�T�\}?b�����m�П�\@F��+�L�O�5S_ȷ	|E;&��d���\茤?�gAz�бh@bd��Q���)G�<�E�+�oO�M_R�QvzGBQd|zG�|�k��	��J�Q��)o4r��x�%\0�¢*UYV+��5�n�IT�U��em&@�W�l H��oI��1`�/I�G�[ z�[�a��k�5�5E���gYOD����q�ˏ>�F=��V���& ����~���I�S
�x҃�����ϖ(�_�h�o��輬<v�ID�v�֨��w���~b�ޚ���e���4�|�XOz|c�_���k'�W����b������+�C����ΝT�����2����vm��j��p���k�������Sa�2������a�v�$�&7�y��W�`D�������ӧ�bɈp      t   �  x�=TA�1<��D�ǉv�����r���w��������r���Ϸ!k�5>�)�T%��j����1�eD.��D�0�6@�O����aF�(T"�Ծ����3{O�IvUb�5���Ϗ�Z�~=~Үd��m`<�>�C��`��+�1vu��x|��o�I���VA��ϟ��s.��$-������y�p&m����×�.����G����%?�b�JK��}�ML���������]@�'v���U�i�����W/s�i��y�Q��[Z��A֖��ۃ;Yj�"���Y>F�K�cuM��![�#-%,!k�ʫ���/r�>�F��&6�`�}���=`�c/��JyW,x5��i'���"_UqoD`�{���?��c�o��E���cPN�;}�����!�`E�}ޤ�>{��Ŧ(�3�躛�etg���"��O�5��2nO
o3DMX����e���o!��X󓹯G�J���fe(����BD�zr�      v   �   x�}�M
�0���)zi��2b��1� n�6���B�xz[�Ϭ?����)
[B!�(��ݯ��"���KtoL�F��僣v��8:ǉ���8�'P�+4�x8S�Jpz	���MSK���qv���?��=�P��G�O�:22K��qg�}����M!uC����q'd�ڇx�A{\�m9���8��a�F��zȜ+�>���Zv��      x   �   x�=Ȼn�0@��<+����DAU�
Is��p�[�)�)���R���\����k�<�c=��9��z��2k���p���\7)8����q���M"�[�6?� V�ò��ΩI���]W���]bd�� j��W�Kܭ� �.��i;�}>_{��n/?�6O|�^U�1<bD	e&�	L? �mf�����ƌ�H�"M�KRY*r��.XӴ_նH�      y   �   x�����@E���@E(U�#VV6l��V�_/*�ذS̹��ӌ��b%�a;��%F*ˮ�<p�)��Y����AQʂZ�q�E��JH����!a:'ij�ݔ�%�Ee4���,U�\ �lKه4i����a��SM�!I�Ѣ��r����H���C4Tp��դp������q�NT�*     