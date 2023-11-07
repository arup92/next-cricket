PGDMP     ;                
    {            db_sb    15.3    15.2 G    k           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            l           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            m           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            n           1262    16399    db_sb    DATABASE     �   CREATE DATABASE db_sb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';
    DROP DATABASE db_sb;
                postgres    false                        2615    17308    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            o           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    5            p           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    5            P           1247    17310 
   PlayerType    TYPE     [   CREATE TYPE public."PlayerType" AS ENUM (
    'Batsman',
    'Bowler',
    'AllRounder'
);
    DROP TYPE public."PlayerType";
       public          postgres    false    5            �            1259    17361    Batting    TABLE     �  CREATE TABLE public."Batting" (
    id integer NOT NULL,
    "oppCountryId" text NOT NULL,
    run integer NOT NULL,
    four integer NOT NULL,
    six integer NOT NULL,
    "strikeRate" double precision NOT NULL,
    "matchDate" date NOT NULL,
    "venueId" text NOT NULL,
    "userId" text NOT NULL,
    "playerId" text NOT NULL,
    "matchId" integer NOT NULL,
    "teamId" text NOT NULL
);
    DROP TABLE public."Batting";
       public         heap    postgres    false    5            �            1259    17360    Batting_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Batting_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Batting_id_seq";
       public          postgres    false    223    5            q           0    0    Batting_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Batting_id_seq" OWNED BY public."Batting".id;
          public          postgres    false    222            �            1259    17370    Bowling    TABLE     l  CREATE TABLE public."Bowling" (
    id integer NOT NULL,
    "oppCountryId" text NOT NULL,
    maiden integer NOT NULL,
    wicket integer NOT NULL,
    eco double precision NOT NULL,
    "matchDate" date NOT NULL,
    "venueId" text NOT NULL,
    "userId" text NOT NULL,
    "playerId" text NOT NULL,
    "matchId" integer NOT NULL,
    "teamId" text NOT NULL
);
    DROP TABLE public."Bowling";
       public         heap    postgres    false    5            �            1259    17369    Bowling_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Bowling_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Bowling_id_seq";
       public          postgres    false    225    5            r           0    0    Bowling_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Bowling_id_seq" OWNED BY public."Bowling".id;
          public          postgres    false    224            �            1259    17345    Match    TABLE       CREATE TABLE public."Match" (
    id integer NOT NULL,
    "teamAId" text NOT NULL,
    "teamBId" text NOT NULL,
    result text NOT NULL,
    "batFirst" text NOT NULL,
    "matchDate" date NOT NULL,
    "venueId" text NOT NULL,
    "userId" text NOT NULL
);
    DROP TABLE public."Match";
       public         heap    postgres    false    5            �            1259    17344    Match_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Match_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Match_id_seq";
       public          postgres    false    220    5            s           0    0    Match_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Match_id_seq" OWNED BY public."Match".id;
          public          postgres    false    219            �            1259    17353    Player    TABLE     �   CREATE TABLE public."Player" (
    "playerId" text NOT NULL,
    "playerName" text NOT NULL,
    "playerCountryId" text NOT NULL,
    "playerType" public."PlayerType",
    weakness text
);
    DROP TABLE public."Player";
       public         heap    postgres    false    5    848            �            1259    17327    Team    TABLE     �   CREATE TABLE public."Team" (
    id integer NOT NULL,
    "teamName" text NOT NULL,
    "teamId" text NOT NULL,
    "userId" text
);
    DROP TABLE public."Team";
       public         heap    postgres    false    5            �            1259    17326    Team_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Team_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Team_id_seq";
       public          postgres    false    216    5            t           0    0    Team_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Team_id_seq" OWNED BY public."Team".id;
          public          postgres    false    215            �            1259    17317    User    TABLE     �  CREATE TABLE public."User" (
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
       public         heap    postgres    false    5            �            1259    17336    Venue    TABLE     �   CREATE TABLE public."Venue" (
    id integer NOT NULL,
    "venueId" text NOT NULL,
    "venueName" text NOT NULL,
    "venueCountryId" text,
    "userId" text NOT NULL
);
    DROP TABLE public."Venue";
       public         heap    postgres    false    5            �            1259    17335    Venue_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Venue_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Venue_id_seq";
       public          postgres    false    5    218            u           0    0    Venue_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Venue_id_seq" OWNED BY public."Venue".id;
          public          postgres    false    217            �           2604    17364 
   Batting id    DEFAULT     l   ALTER TABLE ONLY public."Batting" ALTER COLUMN id SET DEFAULT nextval('public."Batting_id_seq"'::regclass);
 ;   ALTER TABLE public."Batting" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            �           2604    17373 
   Bowling id    DEFAULT     l   ALTER TABLE ONLY public."Bowling" ALTER COLUMN id SET DEFAULT nextval('public."Bowling_id_seq"'::regclass);
 ;   ALTER TABLE public."Bowling" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    224    225            �           2604    17348    Match id    DEFAULT     h   ALTER TABLE ONLY public."Match" ALTER COLUMN id SET DEFAULT nextval('public."Match_id_seq"'::regclass);
 9   ALTER TABLE public."Match" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    17330    Team id    DEFAULT     f   ALTER TABLE ONLY public."Team" ALTER COLUMN id SET DEFAULT nextval('public."Team_id_seq"'::regclass);
 8   ALTER TABLE public."Team" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �           2604    17339    Venue id    DEFAULT     h   ALTER TABLE ONLY public."Venue" ALTER COLUMN id SET DEFAULT nextval('public."Venue_id_seq"'::regclass);
 9   ALTER TABLE public."Venue" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            f          0    17361    Batting 
   TABLE DATA           �   COPY public."Batting" (id, "oppCountryId", run, four, six, "strikeRate", "matchDate", "venueId", "userId", "playerId", "matchId", "teamId") FROM stdin;
    public          postgres    false    223   iW       h          0    17370    Bowling 
   TABLE DATA           �   COPY public."Bowling" (id, "oppCountryId", maiden, wicket, eco, "matchDate", "venueId", "userId", "playerId", "matchId", "teamId") FROM stdin;
    public          postgres    false    225   �_       c          0    17345    Match 
   TABLE DATA           q   COPY public."Match" (id, "teamAId", "teamBId", result, "batFirst", "matchDate", "venueId", "userId") FROM stdin;
    public          postgres    false    220   �c       d          0    17353    Player 
   TABLE DATA           g   COPY public."Player" ("playerId", "playerName", "playerCountryId", "playerType", weakness) FROM stdin;
    public          postgres    false    221   [d       _          0    17327    Team 
   TABLE DATA           D   COPY public."Team" (id, "teamName", "teamId", "userId") FROM stdin;
    public          postgres    false    216   Ij       ]          0    17317    User 
   TABLE DATA           �   COPY public."User" (id, name, email, "isActive", "verifyToken", image, "hashedPassword", "createdAt", "updatedAt", "loginId") FROM stdin;
    public          postgres    false    214   k       a          0    17336    Venue 
   TABLE DATA           Y   COPY public."Venue" (id, "venueId", "venueName", "venueCountryId", "userId") FROM stdin;
    public          postgres    false    218   �k       v           0    0    Batting_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Batting_id_seq"', 143, true);
          public          postgres    false    222            w           0    0    Bowling_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Bowling_id_seq"', 93, true);
          public          postgres    false    224            x           0    0    Match_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Match_id_seq"', 10, true);
          public          postgres    false    219            y           0    0    Team_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Team_id_seq"', 10, true);
          public          postgres    false    215            z           0    0    Venue_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Venue_id_seq"', 5, true);
          public          postgres    false    217            �           2606    17368    Batting Batting_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_pkey";
       public            postgres    false    223            �           2606    17377    Bowling Bowling_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_pkey";
       public            postgres    false    225            �           2606    17352    Match Match_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_pkey";
       public            postgres    false    220            �           2606    17359    Player Player_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Player"
    ADD CONSTRAINT "Player_pkey" PRIMARY KEY ("playerId");
 @   ALTER TABLE ONLY public."Player" DROP CONSTRAINT "Player_pkey";
       public            postgres    false    221            �           2606    17334    Team Team_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Team" DROP CONSTRAINT "Team_pkey";
       public            postgres    false    216            �           2606    17325    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    214            �           2606    17343    Venue Venue_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Venue"
    ADD CONSTRAINT "Venue_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Venue" DROP CONSTRAINT "Venue_pkey";
       public            postgres    false    218            �           1259    17382    Player_playerId_key    INDEX     W   CREATE UNIQUE INDEX "Player_playerId_key" ON public."Player" USING btree ("playerId");
 )   DROP INDEX public."Player_playerId_key";
       public            postgres    false    221            �           1259    17380    Team_teamId_key    INDEX     O   CREATE UNIQUE INDEX "Team_teamId_key" ON public."Team" USING btree ("teamId");
 %   DROP INDEX public."Team_teamId_key";
       public            postgres    false    216            �           1259    17378    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public            postgres    false    214            �           1259    17379    User_verifyToken_key    INDEX     Y   CREATE UNIQUE INDEX "User_verifyToken_key" ON public."User" USING btree ("verifyToken");
 *   DROP INDEX public."User_verifyToken_key";
       public            postgres    false    214            �           1259    17381    Venue_venueId_key    INDEX     S   CREATE UNIQUE INDEX "Venue_venueId_key" ON public."Venue" USING btree ("venueId");
 '   DROP INDEX public."Venue_venueId_key";
       public            postgres    false    218            �           2606    17433    Batting Batting_matchId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES public."Match"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_matchId_fkey";
       public          postgres    false    223    220    3510            �           2606    17428    Batting Batting_playerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES public."Player"("playerId") ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_playerId_fkey";
       public          postgres    false    223    3512    221            �           2606    17438    Batting Batting_teamId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_teamId_fkey";
       public          postgres    false    223    216    3505            �           2606    17423    Batting Batting_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_userId_fkey";
       public          postgres    false    214    223    3501            �           2606    17418    Batting Batting_venueId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Batting"
    ADD CONSTRAINT "Batting_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"("venueId") ON UPDATE CASCADE ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public."Batting" DROP CONSTRAINT "Batting_venueId_fkey";
       public          postgres    false    223    3508    218            �           2606    17458    Bowling Bowling_matchId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES public."Match"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_matchId_fkey";
       public          postgres    false    225    3510    220            �           2606    17453    Bowling Bowling_playerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES public."Player"("playerId") ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_playerId_fkey";
       public          postgres    false    221    225    3512            �           2606    17463    Bowling Bowling_teamId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_teamId_fkey";
       public          postgres    false    216    225    3505            �           2606    17448    Bowling Bowling_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_userId_fkey";
       public          postgres    false    214    225    3501            �           2606    17443    Bowling Bowling_venueId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bowling"
    ADD CONSTRAINT "Bowling_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"("venueId") ON UPDATE CASCADE ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public."Bowling" DROP CONSTRAINT "Bowling_venueId_fkey";
       public          postgres    false    218    3508    225            �           2606    17403    Match Match_result_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_result_fkey" FOREIGN KEY (result) REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_result_fkey";
       public          postgres    false    220    3505    216            �           2606    17393    Match Match_teamAId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_teamAId_fkey" FOREIGN KEY ("teamAId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_teamAId_fkey";
       public          postgres    false    3505    220    216            �           2606    17398    Match Match_teamBId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_teamBId_fkey" FOREIGN KEY ("teamBId") REFERENCES public."Team"("teamId") ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_teamBId_fkey";
       public          postgres    false    3505    216    220            �           2606    17413    Match Match_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_userId_fkey";
       public          postgres    false    3501    220    214            �           2606    17408    Match Match_venueId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"("venueId") ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public."Match" DROP CONSTRAINT "Match_venueId_fkey";
       public          postgres    false    220    3508    218            �           2606    17383    Team Team_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 C   ALTER TABLE ONLY public."Team" DROP CONSTRAINT "Team_userId_fkey";
       public          postgres    false    3501    214    216            �           2606    17388    Venue Venue_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Venue"
    ADD CONSTRAINT "Venue_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."Venue" DROP CONSTRAINT "Venue_userId_fkey";
       public          postgres    false    214    218    3501            f     x���[��8����%Iݨ������ hKc�֥G���E���'A">�NU�y����(eQ���y��`"����E��=�YG�vxW�'�_���	+�b�
�Ccf55z�t�F�y����e�X��0�_���WU�N��$|��T�yƝ��OK�Gu֕~]c��E�ܑ�q���X���̹��KbJDʢ��Y�<�j�����;{%�(/�8Ik�_M_�ZuU}��L[&�]��X�aع�vZ���B��u�c&�LY��:M�V��*`T�2Mu��7�aٜ
kֻQ�w+�n2���G�Б�Tgږ�OĂ���j�/�8l�W3��oZ�K��ٵ�/�X�uj�]����L����p���jK�t�t�I��s?@����	'f�j:H���^{u�,�XP�y�C�TC=��b����Q�Ҙ�LB��LZ~���k��Y`g6��G�oԩ���P����Q�i6q�ܴ|Uuۘ`_��,���4�����o�}�3�����G���b��[�jFSg�S�[dB��Y��;�F#@���=�>hI�Ba31�<��G���(�۫�K�Q��
����^�=��ǖ���.c���j �<���ο��`�>�#B=-=tyĹ�nCt�]�.�;J��wө�F���M����}�-�Ҷ����nP�q�� �F��?곶�c2��?wJ"gt�"�K�25�����u��XI�%��F6˘�h��݂RhF�۵��љS{i�ta�r���2�z��Q��P�F���o�&��n��ui��x�hl�im�|Fs�j�֮&,"��k�3
C��������sv��E\q���G!��Ɇ��OupY�y�8'xB���Į�ofo��G'ԞID��qԟ�����i-�L�_���j������Q����TS������=Ɍ�nYd��「���B�+0���r��g��z�z���N��m+����)&Ǆ���4��2�)�}�i�_Ꮶ�ݟ�t��(V�3�,���{bGŀ�Tl��ƚ�Y�@R�eR��-Z��מ�]
��,Nd({�!��X�'�XAX��������[4ݩwݽhMH	��}�IwkU�yn)�VeJL8PZw�KE���&(V��z�� ��_p�'o���	�_{���?�����j�t��}������6��yp�*�<�ᬫ�Myz;P���P��Y��f�/��q��3n�fDF�6�p��h
pv�(԰�{޸��V���fj���z��R���OHX����P�q�-��K�=*)��}S���f\@�Xץb3k_��`�Z-���r���G�K�1�ĕ�+`;��X�#��R�P,���̈́\�-���� ��z�3���k����o~��Y����2t�-2���pUd��aw���û~E�����߅��U��KBaQ(ԜB�ٍZ�@ "�م��ا�v}��I�ch��LЛk�!]s	[,{u�AL��E;@���mF:�ݝ/��0�~h�U	T$.鬰�YXzo|�g���4b��]�@O+�]�TO�D)9i��k��)�sj6,�h5���F��*\��A�����%A�C[��^����]�S�,pF}��+���퐶���r��!��W�nsg�8[����*�8�¹�.������Au�MH�<O/-u?��_aZ�C�����K�Vx��j/܀y�<6��&Sbq�g�u����.��]�R~qY�c/�}ێ�H��2I8��޼,��r�Ċ8<��3�֏��6d�q���WW� Q\O�Mī5�x,��]�[R���1�1��$i�F���~j;�O�V��a��~����퀅�ʸO��t�Y�����{��<�՝nӂ����	�K�@��3&�*�-��0���=0{ƺ��nX�y���t��ǈGz��Ɩj������Y�����6r�oj��2�)	!�?�E3�W�����w�r�J��H�#��ڍl\q5���͓�N,8�s{��ᒸ��+��H��Glh��<o�w���h���2�G����7�?ܿ      h     x����n�6��һ�5Z�P�ȢA7E���oҢHW���O�K�����ֆ�,����$�~y�!J��$�^yI��ղ���Ԛtk|���,��jl*�h���m]�G����$�h�y���0����<-w�HT�������U.�,P3Nh�C�+\�À�4=�2LyX����=�E��Y�n�cJB�M#�c5b���bRO8[!���c/���å�S��OP"F�0v�g����G+B���I��LE��y�3���5v��������ʨa��/X��^|%FboU���oq^ZAZ���BQ�͓�Y�]��;�c\4g�� �=V���6�1uVl��`�Ҍ��"�,��Y_v;��8U�Q��:eE�d�-����z�l�F���@��a�Z��|���� �p(����eO
��w�t���XKl�@P{&5�~�*q���Z0���p(б����w$�yͣ������0�C�u���~��j�=l�u8E��BJv���Sw7��ᤀ�J��io��G���#�F��q�2q��	�f��A
�"��,����V�C��R��he�21�8���l4� .�	H����8\$s������#t7v�P��
�7�ݬk���r��V:X�u���P�`1Z9����n7L�J,^�����WE��m��Yr5ZϤڑ���]3�JZ��ۘ9qc��^#l<0��c��`q49��ti�0i
Nئ/�|��eN��Y���QJ�Tc/�eG�yyq�y���b�\�S�{{��9��rn$	K�t�ACl��R�aA{�F�>�m��d�^I�����ɺ�C3j�[ 4�#�Ѯ+�wA�n����/��%nx�(��$��o�����v\�b��=2[�4)���ug�����#��w�X��S��de1�'\?��KO�|[8W�8�=psm�4)���~c�~4Z����L'ᙁa�!������|ʖ�'����(�����4�lG�:]�㆞)���G9xq��Pո7���.���%�      c   �   x�}��
�0�ϓw�$m5�1����E�lM��	������!���ar��Z�>)�i���5��zz�.�����8f��`d�$*�Q������.�P�;}�}���[C�H@	���ӿH��7�|�����'i�҃��\l�m�{�pU�      d   �  x�mW�n7}���?#F�>�vcٺ4��	#-���%rW���=C��뤀-���J���F9#�=�O	������W�.�Ut 1c ?e��Ѯ2��,2(�*�9*RC�Nf���*���'�eڦ�`�Z�LǺ�
9�(*���^5��>E1IP.z8�Z��J��/,I����o�onD���}��p#�砼I�������ߋ�Q�#�j*U�N�$ �	�N�=ǚ��NU�<��bw�k:�j��bM��b��r��r��eh{�VpL�|����_�o�n����j��#F���GT��4bq��9��l����S��xIHN3���>烩�z���g����ʆk<�A�b��a0���;�d����P>&8^+�aE�SWX���$P8��leSձ�8��*Ԡ�jk�P�{$�#��KQ�t��9Xr�@FJ1�3H�K�֤�g��t��+x��3�J�h����\%�0!�ڴM�̀�����~0j�Ǝjk��I�
�g�j�kk�?,�Y�ǫ}���Y���|dP8{˱�Y1�sPu�bδ�P"ԙ*:�ՠ�_��p��Piv(-;\���)������N���+c�Ԍ��jr	ݬI���y�A���hu$^0(�/j��Y+�ŲA���a�Js��{b��Qa�ڸ`6��["^`�+�W.���k�"����)���~9��` 븷���t����q�G<ښ��5�`f&TX�s[��_1gY.�<�1��W��&$f��oG���]�xO���w��\��/z�$`�<|�/�Q|v����,�_������քڒd9ey���N����Nl�a��J@�(��uQYZwb�4{*9�
�Q���Zt�'��1˅�AE	ȇmЈ����CBo��`��z��C���a�P6]��m!�zy��i7��ka��!�bXx0q�^�9��@�_���f5�Z}�ʗ�p�s�,6�?��<��ˇ�C'� ~_�A'N�$��k�o����,��5;��Hq�n��xnD�-g$����ra4G��`���mF���֠�m�\<�B�G��ݠGu��G�c ?g0�m�G.�K<fP8�~����p����$�Ό�����za?Ef�o�G��va���\T�!�&/|�N�8�ۉ���/��ZX�L�1��`uޚy\t�#e���2�^��z%*��E����KU���R@��KF㳲��Yd��Y��6C>`�X�|X$X�xk����	��8����i�V��S���
�wz�5ovvtD���컚~�ayAS�����&��%D~4qe�+}D��xw"Dy���kO�0Sg� 8��$Á6��Qnٰcyi�XQ8�N�����b�Bk=R? �L_<�$��p6��I�!���t�mg��?�0���\�h �b��W�R�zE�RۢC�pF��-���A;�7�Y�DaY�&y X<N����ö�މy����o�WWW�����      _   �   x�}��
�@���)|�����D�����䤃6���㗵�w�q�Hmi�<��v]��t|���U��XF�[B�n��JqS�\�B�qY\ę�k�nj_<{� \�`�R��BSK��,�Eb�K�qTo��lCPw�ӜXjWc/$Cc�gU���G�?�k7����C�2���<��x��      ]   �   x�M�Mo�0��s�����"-��fƶl0�9L��R��R��O?�]|n��P��e��41�F>��B�ylgK�7�pB���w	{8�R�0h-/��I�t?~�N_w2�\8?}F�v[rH{���inj�HR���z.�B��w}z�
*�ԫb�-?����_Ou�I"�4�@ٜ�9���9������a�� �X���ʧ�Ў�[��a,H1      a   t   x�3�LI����t��~.��9������@�_Qal`Yj^�b��eę����X�����7�L��MMILJL�t����1��-�MJ���P�U�r�d$%�'�$r� ��u��qqq �&M)     